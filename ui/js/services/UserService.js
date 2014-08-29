/* 
 * file - UserService.js 
 * desc - Angular Service for Controller defined in controller/SiteMgmtUserCtrl.js
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.factory('userService', function($http) {
    console.log('meanBootstrapPortal#userService');
    return {
        getAdminUserList:function(){
            // function used to retrieve list of all documents from Admin_Users collection 
            // having type as 'admin'
            console.log('UserService#getAdminUserList');
            var promise = $http.get('/rest/api/admin/adminUsers').then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('UserService#getAdminUserList.Error - ' + error);
            });
            return promise;
        },
        saveUser:function(userJSON){
            // function to save a document into the Admin_Users collection
            console.log('UserService#saveUser');
            var promise = $http({
                method:'POST',
                url:'/rest/api/admin/saveUser',
                data:userJSON
            }).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('UserService#saveUser.Error - ' + error);
            });
            return promise;
        },
        updateUser:function(userJSON,userID){
            // function to update the document in Admin_Users collection  
            console.log('UserService#updateUser.User ID - ' + userID);
            var promise = $http({
                method:'POST',
                url:'/rest/api/admin/updateUser/'+userID,
                data:userJSON
            }).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('UserService#updateUser.Error - ' + error);
            });
            return promise;
        },
        deleteUser:function(userID){
            // function to delete the document from the Admin_Users collection
            console.log('UserService#deleteUser.User ID - ' + userID);
            var promise = $http.delete('/rest/api/admin/deleteUser/'+userID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('UserService#deleteUser.Error - ' + error);
            });
            return promise;
        },
        getUserByLoginID:function(loginID){
            // function to get a document from Admin_Users collection matching the login_id 
            console.log('UserService#getUserByLoginID.Login ID - ' + loginID);
            var promise = $http.get('/rest/api/admin/login/'+loginID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('UserService#getUserByLoginID.Error - ' + error);
            });
            return promise;
        },
        updatePassword:function(loginID,password){
            // function to update only the password field in the Admin_Users collection
            console.log('UserService#updatePassword.Login ID - ' + loginID);
            var promise = $http.post('/rest/api/user/changePassword/'+loginID+'/'+password).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('UserService#updatePassword.Error - ' + error);
            });
            return promise;
        },
        resetPassword:function(userID){
            // function to reset the password field in the Admin_Users collection
            console.log('UserService#resetPassword.Login ID - ' + userID);
            var promise = $http.post('/rest/api/admin/resetPassword/'+userID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('UserService#resetPassword.Error - ' + error);
            });
            return promise;
        }
    };
});

