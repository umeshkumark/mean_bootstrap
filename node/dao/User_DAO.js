/* 
 * file - User_DAO.js 
 * desc - DAO for CRUD operations for User
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
// connection string for 'User' collection
var userCollection = null;

exports.initUserDAO = function(dbConnURI){
    console.log('User_DAO#initUserDAO');
    mongoDBConnURI = dbConnURI;
    userCollection = mongojs.connect(mongoDBConnURI,["User"]);
};

exports.getUserList = function(successCB,errorCB){
    // function to get the list of documents from the User collection
    console.log('User_DAO#getUserList'); 
    userCollection.User.find(function(error,userList){
        if(error) {
            console.log("User_DAO#getUserList.Error - " + error);
            errorCB(error);
        }
        else if (!userList) {
            console.log("User_DAO#getUserList.No Users exists in DB");
            successCB(null);
        }
        else {
            successCB(userList);
        }
    });
};

exports.saveUser = function(userJSON,successCB,errorCB){
    // function to add a document to the User collection
    console.log('User_DAO#saveUser');    
    userCollection.User.save(userJSON,function(error,savedDoc){
        if(error){
            console.log("User_DAO#saveUser.Error - " + error);
            errorCB(error);
        }
        else if (!savedDoc) {
            console.log("User_DAO#saveUser.Unable to save");
            successCB([]);
        }
        else {
            successCB(savedDoc);
        }
    });
};

exports.updateUser = function(userJSON,userID,successCB,errorCB){
    // function to update an existing document in the User collection 
    console.log('User_DAO#updateUser');
    userCollection.Blog.update({_id:mongojs.ObjectId(userID)},userJSON,function(error,updatedDoc){
        if(error){
            console.log("User_DAO#updateUser.Error - " + error);
            errorCB(error);
        }
        else if (!updatedDoc) {
            console.log("User_DAO#updateUser.Unable to update");
            successCB([]);
        }
        else {
            successCB(updatedDoc);
        }
    });
};

exports.deleteUser = function(userID,successCB,errorCB){
    // function to delete an existing document from the User collection    
};

exports.getUserByUserID = function(user_id,successCB,errorCB){
    // function to get the document matching user_id from the User collection
};
