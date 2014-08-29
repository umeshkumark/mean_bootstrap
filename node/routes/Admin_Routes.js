/* 
 * file - Admin_Routes.js 
 * desc - Rest API calls for all routes meant for User Administration
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

var mongoDBConnURI = "";
var currentDir = "";
var adminDAO = null;
var path = require('path');
var fs = require('fs');
var utility = null;

exports.initAdmin = function(curDir,dbConnURI){
    console.log('Admin_Routes#initAdmin curDir - ' + curDir + ' dbConnURI - ' + dbConnURI);
    mongoDBConnURI = dbConnURI;
    currentDir = curDir;
    // Initialize DAO
    var adminDAOPath = path.join(currentDir,'node','dao','Admin_DAO.js');
    console.log('Admin_Routes#Admin_DAO path - ' + adminDAOPath);
    adminDAO = require(adminDAOPath);
    adminDAO.initAdminDAO(dbConnURI);
    
    // Initialize Utility
    var utilityPath = path.join(currentDir,'node','util','Utility.js')
    console.log('Admin_Routes#UtilityJS path - ' + utilityPath);
    utility = require(utilityPath);
};

// REST API endpoint to get the list of all documents of type 'admin' in the Admin_Users collection
exports.getAdminUserList = function(request,response){
    console.log('Admin_Routes#getAdminUserList');
    adminDAO.getAdminUsers(function(userList){
        console.log("Admin_Routes#getAdminUserList.The no of users retrieved from DB - " + userList.length);
        response.json(userList);
    },function(error){
        console.log("Admin_Routes#getAdminUserList.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to get the list of all documents of type 'super_admin' in the Admin_Users collection
exports.getSuperAdminUserList = function(request,response){
    console.log('Admin_Routes#getSuperAdminUserList');
    adminDAO.getSuperAdminUser(function(userList){
        console.log("Admin_Routes#getSuperAdminUser.The no of users retrieved from DB - " + userList.length);
        response.json(userList);
    },function(error){
        console.log("Admin_Routes#getSuperAdminUserList.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to get the list of documents matching the _id in the Admin_Users collection
exports.getUserByID = function(request,response){
    console.log('Admin_Routes#getUserByID');
    var userID = request.params.userID;
    adminDAO.getUserDetailsByID(userID,function(userList){
        console.log("Admin_Routes#getUserByID.The no of users retrieved from DB - " + userList.length);
        response.json(userList);
    },function(error){
        console.log("Admin_Routes#getUserByID.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to get the list of documents matching the login_id in the Admin_Users collection
exports.getUserByLoginID = function(request,response){
    console.log('Admin_Routes#getUserByLoginID');
    var loginID = request.params.loginID;
    adminDAO.getUserDetailsByLoginID(loginID,function(userList){
        console.log("Admin_Routes#getUserByLoginID.The no of users retrieved from DB - " + userList.length);
        response.json(userList);
    },function(error){
        console.log("Admin_Routes#getUserByLoginID.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to save the document into the Admin_Users collection
exports.saveUser = function(request,response){
    console.log('Admin_Routes#saveUser');
    var userJSON = request.body;
    console.dir(userJSON);
    // Hash the password
    var passwordHash = utility.generateHash(userJSON.password);
    var newUserJSON = {
        name:userJSON.name,
        email:userJSON.email,
        login_id:userJSON.login_id,
        password:passwordHash,
        creationDate:new Date(),
        updationDate:new Date(),
        type:userJSON.type,
        status:userJSON.status
    };
    adminDAO.saveUser(newUserJSON,function(user){
        console.log("Admin_Routes#saveUser.Saved User - " + user);
        // Get the list of Users
        adminDAO.getAdminUsers(function(userList){
            console.log("Admin_Routes#saveUser.The no of users retrieved from DB - " + userList.length);
            response.json(userList);
        },function(error){
            console.log("Admin_Routes#saveUser.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Admin_Routes#saveUser.Error - " + error);
    });
};

// REST API endpoint to update the document matching the _id in the Admin_Users collection
exports.updateUser = function(request,response){
    console.log('Admin_Routes#updateUser');
    var userJSON = request.body;
    console.dir(userJSON);
    var userID = request.params.userID;
    
    var updateUserJSON = {
        name:userJSON.name,
        email:userJSON.email,
        login_id:userJSON.login_id,
        creationDate:userJSON.creationDate,
        updationDate:new Date(),
        type:userJSON.type,
        status:userJSON.status
    };
    adminDAO.updateUser(userID,updateUserJSON,function(user){
        console.log("Admin_Routes#updateUser.Updated User - " + user);
        // Get the list of Users
        adminDAO.getAdminUsers(function(userList){
            console.log("Admin_Routes#updateUser.The no of users retrieved from DB - " + userList.length);
            response.json(userList);
        },function(error){
            console.log("Admin_Routes#updateUser.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Admin_Routes#updateUser.Error - " + error);
    });
};

// REST API endpoint to delete the document matching the _id in the Admin_Users collection
exports.deleteUser = function(request,response){
    console.log('Admin_Routes#deleteUser');
    var userID = request.params.userID;
    adminDAO.deleteUser(userID,function(){
        adminDAO.getAdminUsers(function(userList){
            console.log("Admin_Routes#deleteUser.The no of users retrieved from DB - " + userList.length);
            response.json(userList);
        },function(error){
            console.log("Admin_Routes#deleteUser.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Admin_Routes#deleteUser.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to reset the password in the document matching the _id in the Admin_Users collection
// This is usally called by the super admin user to reset the password of admin
exports.resetPassword = function(request,response){
    console.log('Admin_Routes#resetPassword');
    var defaultPassword = 'Log@123$';
    var passwordHash = utility.generateHash(defaultPassword);
    console.log('Admin_Routes#resetPassword Password Hash - ' + passwordHash);
    var userID = request.params.userID;
    adminDAO.resetPassword(userID,passwordHash,function(user){
        console.log("Admin_Routes#resetPassword.Reset Password ");
        // Get the list of Users
        adminDAO.getAdminUsers(function(userList){
            console.log("Admin_Routes#resetPassword.The no of users retrieved from DB - " + userList.length);
            response.json(userList);
        },function(error){
            console.log("Admin_Routes#resetPassword.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Admin_Routes#resetPassword.Error - " + error);
    });
};

// REST API endpoint to change the password in the document matching the _id in the Admin_Users collection
// This is called by the user's themselves to modify their password
exports.changeUserPassword = function(request,response){
    console.log('Admin_Routes#changeUserPassword');
   // var defaultPassword = 'Log@123$';
   var loginID = request.params.loginID;
   var password = request.params.password;
   var passwordHash = utility.generateHash(password);
    adminDAO.changePassword(loginID,passwordHash,function(user){
        console.log("Admin_Routes#changeUserPassword.Success");
            // SUCCESS
            response.json({
                status:'SUCCESS'
            });
        },function(error){
            console.log("Admin_Routes#changeUserPassword.Error - " + error);
            response.json({
                status:'ERROR'
            });
        });
};


// REST API endpoint to authenticate user with loginID & password
exports.authenticateUser = function(request,response){
    console.log('Admin_Routes#authenticateUser');
    var loginID = request.params.loginID;
    var password = request.params.password;
    var passwordHash = utility.generateHash(password); 
    adminDAO.authenticateUser(loginID,passwordHash,function(userList){
        console.log("Admin_Routes#authenticateUser.The no of users retrieved from DB - " + userList.length);
        response.json(userList);
    },function(error){
        console.log("Admin_Routes#authenticateUser.Error - " + error);
        response.json([]);
    });
};