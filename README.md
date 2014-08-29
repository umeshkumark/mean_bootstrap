Introduction:

The mean_bootstrap repository is intended to be a bootstrap application for a web site / application using  the MEAN stack.
It comes built in with 4 screens:Carousel,Blog,Gallery & Contact Us. There is also a Site Management section to add/edit/delete
contents under these 4 screens.

Pre-Requisites:

1) Either install Mongodb or create an account in any 'Database as a Service' providers like mongolab
2) Install node

Credits:

This mean_bootstrap application uses a no of frameworks/libraries which have been made available for free.
Without these frameworks/libraries it wouldnt have been possible to create this mean_bootstrap application.

List of external frameworks/libraries used in mean_bootstrap
1) jQuery (version 1.11.0)
2) bootstrap (version 3.2.0)
3) angularjs (version 1.2.3)
4) kendo ui core
5) angular-kendo
6) angular-route
7) angular-ui-bootstrap
8) ng-grid
9) summernote
10) angular-google-maps
11) font-awesome
12) expressjs
13) mongojs

Installation & Deployment:

1) Once the code is downloaded & copied to a directory, go the directory & run the following command

npm install

It will install expressjs (version 3.2.5) & mongojs (version 0.13.0), node driver for mongodb in a folder called node_modules in the current directory

2) Once the Mongodb is installed or an account is created in any providers, login to mondogb & execute the following commands. This will create the db & Collections required by the mean_bootstrap application 

use meanbootstrap

The above command will create a db 'meanbootstrap'. This can be verified by running the below command

show dbs

db.createCollection("Admin_Users",{autoIndexId:true})
db.createCollection("Album",{autoIndexId:true})
db.createCollection("Album_Images",{autoIndexId:true})
db.createCollection("Blog",{autoIndexId:true})
db.createCollection("Carousel",{autoIndexId:true})
db.createCollection("ContactUs",{autoIndexId:true})
db.createCollection("Gallery",{autoIndexId:true})

These commands will create collections with a '_id' field that will auto-increment everytime a document is added to the collection

3) Add a default user , who will have the authorizations to change content in the deployed application.

db.Admin_Users.insert({
	"name" : "super admin",
    "email" : "superadmin@meanbootstrap.com",
    "login_id" : "superadmin",
    "password" : "17c4520f6cfd1ab53d8745e84681eb49",
    "creationDate" : ISODate("2014-08-24T18:22:11.497Z"),
    "updationDate" : ISODate("2014-08-24T18:22:11.497Z"),
    "type" : "superadmin",
    "status" : "active"
});

The values for the default user is mentioned in the file superadmin.js.For more details refer to the 'Site Administration' section below

4) Change port no , mongodb connection URI in config.json

If you wish to have different databases for development, testing & production, then create 3 databases & modify the corresponding entry in config.json

1) prodDBConnURI - mongodb connection URI for production DB
2) devDBConnURI - mongodb connection URI for development DB
3) qaDBConnURI - mongodb connection URI for testing DB

4) environment - differentiates between development/testing & production environment

values:
dev - development . In this case mean_bootstrap application will connect to the devDBConnURI
prod - production . In this case mean_bootstrap application will connect to the prodDBConnURI
qa - testing . In this case mean_bootstrap application will connect to the qaDBConnURI

If the application is going to be deployed in paas providers like quickshift, then change the value of host field

5) host - differentiates between deploying the application in servers hosted by us/company vs servers hosted by openshot/heroku

values:
local :  In this case , the mean_bootstrap application will be deployed in servers/desktop that is owned by us or our company
openshift - In this case the mean_bootstrap application will be deployed in openshift server

See section 'Deploying in PAAS providers' 

Start Node:

Once the mean_bootstrap application is configured , deployed & the mongodb collections are created successfully start the node server

cd to the directory where the code is deployed & run the following command

node node_server.js
