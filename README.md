Javascript based application framework using the MEAN stack 


TO DO:

- Profile controller not recognised error in console
- Fix routes to display appropriate pre/post sign in/up views

NOTE: Current DB setting in config/env/development.json is set to local MongoDB.
Must be changed back to Heroku version for remote testing.


For local MongoDB setup on mac osx:

Install using Brew or manual. 
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

Extract and copy to specified folder.

Create a directory to write Mongo data to.
mkdir -p /data/db 

cd into directory containing mongod.
Run ./mongod to start database

Control-c to stop database.

Further steps may be required such as setting up the location on the mongod binary in your PATH.
See link to official MongoDB install page for more details.