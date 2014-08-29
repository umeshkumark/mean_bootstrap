/* 
 * file - LoginCtrl.js 
 * desc - Angular Controller for the Login menu 
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.controller('LoginCtrl',function($scope,loginService,$rootScope,$location){
    console.log('LoginCtrl');
    
    $scope.user={
        login:'',
        password:''
    };
    
    $scope.onLogin = function(){
        console.log('LoginCtrl#onLogin');
        var isAuthenticated = loginService.login($scope.user.login,$scope.user.password);
        isAuthenticated.then(function(response){
            if(response != null && response.length == 1){
                console.log('LoginCtrl#onLogin#Successfuly Authenticated');
                console.dir(response);
                var data = response[0];
                $rootScope.userDetails = {
                    _id:data._id,
                    type:data.type,
                    name:data.name,
                    email:data.email,
                    login_id:data.login_id
                };
                $rootScope.isUserLoggedIn = true;
                console.dir($rootScope.userDetails);
                $location.path("carousel");
            }
        });
    };
    
    $scope.onCancel = function(){
        console.log('LoginCtrl#onCancel');
        $location.path("carousel");
    };
    
    $rootScope.onLogout = function(){
        console.log('LoginCtrl#onLogout');
        // Simulate Session Destroy
        $rootScope.userDetails = {
                    _id:'',
                    type:'',
                    name:'',
                    email:'',
                    login_id:''
                };
        $rootScope.isUserLoggedIn = false;
        $location.path("carousel");
    };
    
});
