# Database Triggers and Functions

1. After a RentRequest is accepted then reject all other requests for that property during that tenure

```sql
CREATE OR REPLACE FUNCTION request_accepted()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert the accepted request into ActiveRent
  INSERT INTO "ActiveRent" ("itemId", "userId", "startDate", "endDate", "price")
  VALUES (NEW."itemId", NEW."userId", NEW."startDate", NEW."endDate", NEW.price);

  -- Update other overlapping requests to be rejected
  UPDATE "RentRequest"
  SET "ownerStatus" = 'REJECTED', "adminStatus" = 'REJECTED'
  WHERE "itemId" = NEW."itemId"
    AND "startDate" >= NEW."startDate"
    AND "endDate" <= NEW."endDate"
    AND id != NEW.id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER request_accepted
AFTER UPDATE ON "RentRequest"
FOR EACH ROW
WHEN (NEW."ownerStatus" = 'ACCEPTED' AND NEW."adminStatus" = 'ACCEPTED')
EXECUTE FUNCTION request_accepted();
```

2. If an Item is deleted i.e. userId is set to 0, then 'REJECT' all the requests for that item and update user to 0 which is pointing to NULL user to avoid foreign key constraint and deleting user renting history

```sql
CREATE OR REPLACE FUNCTION rejectRentRequestsOnUserUpdate()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the userId is updated to 0
  IF NEW."userId" = 0 AND OLD."userId" IS DISTINCT FROM 0 THEN
    -- Reject all RentRequests with the same itemId
    UPDATE "RentRequest"
    SET "adminStatus" = 'REJECTED', "ownerStatus" = 'REJECTED'
    WHERE "itemId" = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to execute the function before each update on Item
CREATE TRIGGER reject_rent_requests_trigger
BEFORE UPDATE ON "Item"
FOR EACH ROW
EXECUTE FUNCTION rejectRentRequestsOnUserUpdate();
```

3. If a property is made unavailable then you can't create any more new requests for that property

```sql
CREATE OR REPLACE FUNCTION checkItemAvailability()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM "Item"
    WHERE "Item"."id" = NEW."itemId"
      AND "Item"."isAvailable" = true
  ) THEN
    RAISE EXCEPTION 'The requested item is not available';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_item_availability_trigger
BEFORE INSERT ON "RentRequest"
FOR EACH ROW
EXECUTE FUNCTION checkItemAvailability();
```

4. As soon as User Created we need to initialize empty cart

```sql
CREATE OR REPLACE FUNCTION createCartForNewUser()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Cart" ("userId", "value")
  VALUES (NEW.id, 0);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_cart_after_user_insert
AFTER INSERT ON "User"
FOR EACH ROW
EXECUTE FUNCTION createCartForNewUser();
```

5. On Update, Add or Delete of CartItem, update the cart value

```sql
CREATE OR REPLACE FUNCTION updateCartOnCartItemInsert()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "Cart"
  SET "value" = "value" + NEW."price"
  WHERE "id" = NEW."cartId";

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION updateCartOnCartItemDelete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "Cart"
  SET "value" = "value" - OLD."price"
  WHERE "id" = OLD."cartId";

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION updateCartOnCartItemUpdate()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "Cart"
  SET "value" = "value" - OLD."price" + NEW."price"
  WHERE "id" = NEW."cartId";

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cart_on_cartitem_insert
AFTER INSERT ON "CartItem"
FOR EACH ROW
EXECUTE FUNCTION updateCartOnCartItemInsert();

CREATE TRIGGER update_cart_on_cartitem_delete
AFTER DELETE ON "CartItem"
FOR EACH ROW
EXECUTE FUNCTION updateCartOnCartItemDelete();

CREATE TRIGGER update_cart_on_cartitem_update
AFTER UPDATE ON "CartItem"
FOR EACH ROW
EXECUTE FUNCTION updateCartOnCartItemUpdate();
```

5. After user create, automatically update his profile pic

```sql
CREATE OR REPLACE FUNCTION updateUserProfilePic()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE "User"
  SET "profilePic" = 'https://ejemahwsmspobcfvofxe.supabase.co/storage/v1/object/public/profile-photos/' || NEW."id" || '/profile'
  WHERE "id" = NEW."id";

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profile_pic
AFTER INSERT ON "User"
FOR EACH ROW
EXECUTE FUNCTION updateUserProfilePic();
```

6. Procedure to migrate ActiveRent to OverRent
Need to enable `pgcron` extension and schedule the procedure to run daily

```sql
select cron.schedule(
  're',
  '0 0 * * *',
  $$ CALL moveactiverenttooverrent(); $$
);
```
```sql
CREATE
OR REPLACE PROCEDURE moveactiverenttooverrent () AS $$
BEGIN

  INSERT INTO "OverRent" ("itemId", "userId", "startDate", "endDate", "isPaid", "price")
  SELECT
    "itemId",
    "userId",
    "startDate",
    "endDate",
    "isPaid",
    "price"
  FROM "ActiveRent"
  WHERE  ("endDate"::TIMESTAMP AT TIME ZONE 'Asia/Kolkata') < (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::TIMESTAMP;


  DELETE FROM "ActiveRent"
  WHERE  ("endDate"::TIMESTAMP AT TIME ZONE 'Asia/Kolkata') < (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kolkata')::TIMESTAMP;
  
END;
$$ LANGUAGE plpgsql;

-- select * from cron.job_run_details;
-- select * from cron.job;
-- select cron.unschedule(9);
```

7. Empty Message
```sql
CREATE OR REPLACE FUNCTION createEmptyMessageForUser()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Message" ("userId", "message")
  VALUES (NEW.id, ARRAY[]::VARCHAR[]); -- Assuming an empty array for message

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_empty_message_for_user
AFTER INSERT ON "User"
FOR EACH ROW
EXECUTE FUNCTION createEmptyMessageForUser();
```

8. Deleting a user
```sql
CREATE OR REPLACE FUNCTION delete_user_and_related_data(p_user_id INT)
RETURNS VOID AS $$
BEGIN
  -- Delete from the "Payments" table
  DELETE FROM "Payments" WHERE "userId" = p_user_id;

  -- Delete from the "RentRequest" table
  DELETE FROM "RentRequest" WHERE "userId" = p_user_id;

  -- Delete from the "ActiveRent" table
  DELETE FROM "ActiveRent" WHERE "userId" = p_user_id;

  -- Delete from the "CartItem" table
  DELETE FROM "CartItem" WHERE "cartId" IN (SELECT id FROM "Cart" WHERE "userId" = p_user_id);

  -- Delete from the "Cart" table
  DELETE FROM "Cart" WHERE "userId" = p_user_id;

  -- Delete from the "Message" table
  DELETE FROM "Message" WHERE "userId" = p_user_id;

  -- Delete from the "OverRent" table
  DELETE FROM "OverRent" WHERE "userId" = p_user_id;

  -- Delete from the "Item" table
  DELETE FROM "Item" WHERE "userId" = p_user_id;

  -- Finally, delete from the "User" table
  DELETE FROM "User" WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;
```
To use the function, you can call it like this:
```sql
-- To delete a user and all related data
SELECT delete_user_and_related_data(1);
```

9. Requesting for an Item
```sql
CREATE OR REPLACE FUNCTION updateMessages()
RETURNS TRIGGER AS $$
BEGIN
  -- Add the new item to all Message.message arrays
  UPDATE "Message"
  SET message = message || NEW.item
  WHERE true; -- Add any additional conditions here if needed

  -- Remove one string from arrays if length is over 5
  UPDATE "Message"
  SET message = message[2:6]
  WHERE array_length(message, 1) > 5;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_request_insert
AFTER INSERT ON "Request"
FOR EACH ROW
EXECUTE FUNCTION updateMessages();
```

10. Deleting an Requested Item
```sql
-- Create or replace the function to update messages after delete
CREATE OR REPLACE FUNCTION updateMessagesAfterDelete()
RETURNS TRIGGER AS $$
BEGIN
  -- If the operation is DELETE, remove the item from all Message.message arrays
  IF TG_OP = 'DELETE' THEN
    UPDATE "Message"
    SET message = array_remove(message, OLD.item)
    WHERE OLD.item = ANY(message);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to execute the function after a deletion in the Request table
CREATE TRIGGER after_request_delete
AFTER DELETE ON "Request"
FOR EACH ROW
EXECUTE FUNCTION updateMessagesAfterDelete();
```