/* 
 * file - Admin_DAO.js 
 * desc - DAO for CRUD operations for Admin Collection
 * 
 * successCB - successCallBack function.
 * errorCB - errorCallBack function.
 * 
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 * 
 */

// MongoJS driver
var mongojs = require('mongojs');
// mongodb connection URI
var mongoDBConnURI = null;
// connection string for 'Admin_Users' collection
var adminUsersCollection = null;
// connection string for 'Admin_Site_Parameters' collection
var adminSiteCollection = null;

exports.initAdminDAO = function(dbConnURI){
    console.log('Admin_DAO#initAdminDAO');
    mongoDBConnURI = dbConnURI;
    adminUsersCollection = mongojs.connect(mongoDBConnURI,["Admin_Users"]);
    adminSiteCollection = mongojs.connect(mongoDBConnURI,["Admin_Site_Parameters"]);
};

// function to get the list of documents from Admin_Users collection having role as 'admin'
exports.getAdminUsers = function(successCB,errorCB){
    console.log('Admin_DAO#getAdminUsers');
    adminUsersCollection.Admin_Users.find({type:'admin'},function(error,user){
        if(error) {
            console.log("Admin_DAO#getAdminUsers.Error - " + error);
            errorCB(error);
        }
        else if (!user) {
            console.log("Admin_DAO#getAdminUsers.No User exists in DB");
            successCB(null);
        }
        else {
            successCB(user);
        }
    });
};

// function to get the list of documents from Admin_Users collection having role as 'super_admin'
exports.getSuperAdminUser = function(successCB,errorCB){
    console.log('Admin_DAO#getSuperAdminUser');
    adminUsersCollection.Admin_Users.find({type:'super_admin'},function(error,user){
        if(error) {
            console.log("Admin_DAO#getSuperAdminUser.Error - " + error);
            errorCB(error);
        }
        else if (!user) {
            console.log("Admin_DAO#getSuperAdminUser.No User exists in DB");
            successCB(null);
        }
        else {
            successCB(user);
        }
    });
};

// function to get the list of documents from Admin_Users collection matching the _id
exports.getUserDetailsByID = function(userID,successCB,errorCB){
    console.log('Admin_DAO#getUserDetailsByID User ID - ' + userID);
    adminUsersCollection.Admin_Users.find({_id:mongojs.ObjectId(userID)},function(error,user){
        if(error) {
            console.log("Admin_DAO#getUserDetailsByID.Error - " + error);
            errorCB(error);
        }
        else if (!user) {
            console.log("Admin_DAO#getUserDetailsByID.No User exists in DB");
            successCB(null);
        }
        else {
            successCB(user);
        }
    });
};

// function to get the list of documents from Admin_Users collection matching the login_id
exports.getUserDetailsByLoginID = function(loginID,successCB,errorCB){
    console.log('Admin_DAO#getUserDetailsByLoginID Login ID - ' + loginID);
    adminUsersCollection.Admin_Users.find({login_id:mongojs.ObjectId(loginID)},function(error,user){
        if(error) {
            console.log("Admin_DAO#getUserDetailsByLoginID.Error - " + error);
            errorCB(error);
        }
        else if (!user) {
            console.log("Admin_DAO#getUserDetailsByLoginID.No User exists in DB");
            successCB(null);
        }
        else {
            successCB(user);
        }
    });
};

// function to save a document into Admin_Users collection
exports.saveUser = function(userJSON,successCB,errorCB){
    console.log('Admin_DAO#saveUser User JSON - ' + userJSON);
    adminUsersCollection.Admin_Users.save(userJSON,function(error,savedDoc){
        if(error){
            console.log("Admin_DAO#saveUser.Error - " + error);
            errorCB(error);
        }
        else if (!savedDoc) {
            console.log("Admin_DAO#saveUser.Unable to save");
            successCB([]);
        }
        else {
            successCB(savedDoc);
        }
    });
};

// function to update the document matching the _id in the Admin_Users collection
exports.updateUser = function(userID,userJSON,successCB,errorCB){
    console.log('Admin_DAO#updateUser User ID - ' + userID);
    adminUsersCollection.Admin_Users.update(
        {_id:mongojs.ObjectId(userID)},
        {$set: {name:userJSON.name,email:userJSON.email,login_id:userJSON.login_id,updationDate:userJSON.updationDate,type:userJSON.type,status:userJSON.status}},
        function(error,updatedDoc){
            if(error){
                console.log("Admin_DAO#updateUser.Error - " + error);
                errorCB(error);
            }
            else if (!updatedDoc) {
                console.log("Admin_DAO#updateUser.Unable to update");
                successCB([]);
            }
            else {
                successCB(updatedDoc);
            }
        });
};

// function to update the password of the document mathing the _id in the Admin_Users collection
exports.resetPassword = function(userID,password,successCB,errorCB){
    console.log('Admin_DAO#resetPassword User ID - ' + userID);
    adminUsersCollection.Admin_Users.update(
        {_id:mongojs.ObjectId(userID)},
        {$set: {password:password}},
        function(error,updatedDoc){
            if(error){
                console.log("Admin_DAO#resetPassword.Error - " + error);
                errorCB(error);
            }
            else if (!updatedDoc) {
                console.log("Admin_DAO#resetPassword.Unable to Reset");
                successCB([]);
            }
            else {
                successCB(updatedDoc);
            }
        });
};

// function to update the password of the document mathing the login_id in the Admin_Users collection
exports.changePassword = function(loginID,password,successCB,errorCB){
    console.log('Admin_DAO#updatePassword User ID - ' + loginID);
    adminUsersCollection.Admin_Users.update(
        {login_id:loginID},
        {$set: {password:password}},
        function(error,updatedDoc){
            if(error){
                console.log("Admin_DAO#updatePassword.Error - " + error);
                errorCB(error);
            }
            else if (!updatedDoc) {
                console.log("Admin_DAO#updatePassword.Unable to Update");
                successCB([]);
            }
            else {
                successCB(updatedDoc);
            }
        });
};


// function to delete the document matching the _id in the Admin_Users collection
exports.deleteUser = function(userID,successCB,errorCB){
    console.log('Admin_DAO#deleteUser User ID - ' + userID);
    adminUsersCollection.Admin_Users.remove({_id:mongojs.ObjectId(userID)},function(error){
        if(error){
            console.log("Admin_DAO#deleteUser.Error - " + error);
            errorCB(error);
        }
        else {
            successCB();
        }
    });
};

// function to authenticate the user
exports.authenticateUser = function(loginID,password,successCB,errorCB){
    console.log('Admin_DAO#authenticateUser Login ID - ' + loginID);
    adminUsersCollection.Admin_Users.find({login_id:loginID,password:password},function(error,user){
        if(error) {
            console.log("Admin_DAO#authenticateUser.Error - " + error);
            errorCB(error);
        }
        else if (!user) {
            console.log("Admin_DAO#authenticateUser.No User exists in DB");
            successCB(null);
        }
        else {
            successCB(user);
        }
    });
};