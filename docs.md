# Things to think about
1. If user want to delete an item, check if any active rent requests then stop the user from deleting the item. else maybe without deleting th item, we detach the item foreign key to NULL user who is id 0

2. NULL user is the dummy user who has all the deleted items attached inorder to maintain renters request history