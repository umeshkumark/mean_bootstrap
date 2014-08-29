/* 
 * file - ContactUsService.js 
 * desc - Angular Service for the Controllers defined in controller/ContactUsCtrl.js 
 * & controller/SiteMgmtContactUsCtrl.js
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.factory('contactusService', function($http) {
    console.log('meanBootstrapPortal#contactusService');
    return {
        getContactUsInfo:function(){
            console.log('contactusService#getContactUsInfo');
            var promise = $http.get('/rest/api/contact/contactUs').then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('contactusService#getContactUsInfo.Error - ' + error);
            });
            return promise;
        },
        save:function(json,contactID,type){
            console.log('contactusService#save');
            console.dir(json);
            var promise = $http({
                method:'POST',
                url:'/rest/api/contact/save/'+type+'/'+contactID,
                data:json
            }).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('contactusService#save.Error - ' + error);
            });
            return promise;
        }
    };
});
