Edit me later
# getnoteHUB

This is a basic personal blog site, using node and express

1) /routes/blogroutes
all the routes that take place one the user logs in are handled here

   /routes/authroutes
   Authentication routes in here

2) The DB has two collections (user, blogs)
  In your database make two collections - users , blogs
  the email of the user is used as key to join two collections.

3) Basic authentication 
   verify email id in the right format using node-email-validator
   password encrypted using crypto


4) After deleting, can't redirect in app.js (server)
    thus return a json file with path to redirect
    get the data in the js of details.ejs file
   -redirect from there.


