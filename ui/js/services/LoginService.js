/* 
 * file - LoginService.js 
 * desc - Angular Service for Controller defined in controller/LoginCtrl.js
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.factory('loginService', function($http) {
    console.log('meanBootstrapPortal#LoginService');
    return {
        login:function(loginID,password){
            console.log('LoginService#login');
            var promise = $http.post('/rest/api/admin/login/'+loginID+'/'+password).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('LoginService#login.Error - ' + error);
            });
            return promise;
        }
    };
});
