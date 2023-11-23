# Database Triggers and Functions

1. After a RentRequest is accepted then reject all other requests for that property during that tenure
```sql
CREATE OR REPLACE FUNCTION updateRentRequests(
  id INT,
  sd TIMESTAMP WITH TIME ZONE,
  ed TIMESTAMP WITH TIME ZONE
) RETURNS VOID AS $$
BEGIN
  UPDATE "RentRequest"
  SET status = 'REJECTED'
  WHERE "itemId" = id
    AND "startDate" >= sd
    AND "endDate" <= ed;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION request_accepted()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert the accepted request into ActiveRent
  INSERT INTO "ActiveRent" ("itemId", "userId", "startDate", "endDate", "price")
  VALUES (NEW."itemId", NEW."userId", NEW."startDate", NEW."endDate", NEW.price);

  -- Delete the accepted request from RentRequest
  DELETE FROM "RentRequest" WHERE id = NEW.id;

  -- Update other overlapping requests to be rejected
  PERFORM updateRentRequests(NEW."itemId", NEW."startDate", NEW."endDate");

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER request_accepted
AFTER UPDATE ON "RentRequest"
FOR EACH ROW
WHEN (NEW.status = 'ACCEPTED')
EXECUTE FUNCTION request_accepted();
```