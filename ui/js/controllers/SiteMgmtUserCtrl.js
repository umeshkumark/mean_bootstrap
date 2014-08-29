/* 
 * file - SiteMgmtUserCtrl.js 
 * desc - Angular Controller for the User Management submenu under Site Management Menu
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.controller('SiteMgmtUserCtrl',function($scope,userService,$rootScope){
    console.log('SiteMgmtUserCtrl');
    
    $scope.selectedUserID = "";
    $scope.isUserSave = true;
    $scope.isUserUpdate = false;
    
    $scope.userProfile={
        password1:"",
        password2:""
    };
    
    $scope.onPasswordUpdate = function(){
        console.log('SiteMgmtUserCtrl#onPasswordUpdate');
        console.dir($rootScope.userDetails);
        console.log('SiteMgmtUserCtrl#onPasswordUpdate User ID - ' + $rootScope.userDetails.login_id);
        var isUpdated = userService.updatePassword($rootScope.userDetails.login_id,$scope.userProfile.password1);
        isUpdated.then(function(response){
            console.log('SiteMgmtUserCtrl#onPasswordUpdate#success');
            console.dir(response);
        });
    };
    
    
    $scope.user={
        name:"",
        login_id:"",
        password:"",
        email:"",
        type:'admin',
        status:'active'
    };
    
    $scope.adminUserList = [];
    
    var adminUsers = userService.getAdminUserList();
    adminUsers.then(function(data){
        console.log('SiteMgmtUserCtrl#No Of Admin Users - ' + data.length);
        $scope.adminUserList = data;
    });
    
    // called when the user clicks on the RESET button
    $scope.onUserReset = function(){
        $scope.isUserSave = true;
        $scope.isUserUpdate = false;
        $scope.user={
            name:"",
            login_id:"",
            password:"",
            email:"",
            type:'admin',
            status:'active'
        };
    };
    
    // called when the user clicks on the SAVE button 
    $scope.onUserSave = function(){
        console.log('SiteMgmtUserCtrl#onUserSave');
        var userJSON = {
            name:$scope.user.name,
            login_id:$scope.user.login_id,
            password:$scope.user.password,
            email:$scope.user.email,
            type:'admin',
            status:'active'
        };
        var isSaved = userService.saveUser(userJSON);
        isSaved.then(function(data){
            $scope.adminUserList = data;
            // Reset the Fields
            $scope.onUserReset();
        });
    };
    
    // called when the user clicks on the DELETE button from the Grid
    $scope.onUserDelete = function(selectedRow){
        console.log('SiteMgmtUserCtrl#onUserDelete');
        $scope.selectedUserID = selectedRow.entity._id;
        var isDeleted = userService.deleteUser($scope.selectedUserID);
        isDeleted.then(function(data){
            $scope.adminUserList = data;
            // Reset the Fields
            $scope.onUserReset();
        });
    };
    
    // called when the user clicks on the EDIT button from the Grid
    $scope.onUserEdit = function(selectedRow){
        console.log('SiteMgmtUserCtrl#onUserEdit');
        $scope.selectedUserID = selectedRow.entity._id;
        $scope.user.name = selectedRow.entity.name;
        $scope.user.login_id = selectedRow.entity.login_id;
        $scope.user.password = selectedRow.entity.password;
        $scope.user.email = selectedRow.entity.email;
        $scope.isUserSave = false;
        $scope.isUserUpdate = true;
    };
    
    // called when the user clicks on the UPDATE button
    $scope.onUserUpdate = function(){
        console.log('SiteMgmtUserCtrl#onUserUpdate');
        var userJSON = {
            name:$scope.user.name,
            login_id:$scope.user.login_id,
            email:$scope.user.email,
            type:'admin',
            status:'active'
        };
        var isSaved = userService.updateUser(userJSON,$scope.selectedUserID);
        isSaved.then(function(data){
            $scope.adminUserList = data;
            // Reset the Fields
            $scope.onUserReset();
        });
    };
    
    // called when the user clicks on the RESET Password button in the User Grid
    $scope.resetPassword = function(selectedRow){
        console.log('SiteMgmtUserCtrl#resetPassword');
        var userID = selectedRow.entity._id;
        var isReset = userService.resetPassword(userID);
        isReset.then(function(data){
            $scope.adminUserList = data;
            // Reset the Fields
            $scope.onUserReset();
        });
    };
    
    // called when the user clicks on the CHANGE PASSWORD button in the User Profile screen
    $scope.changePassword = function(){
        console.log('SiteMgmtUserCtrl#changePassword');
    };
    
    // called when the user clicks on the UPDATE PROFILE button in the User Profile screen
    $scope.updateProfile = function(){
        console.log('SiteMgmtUserCtrl#updateProfile');
    };
    
    // User Grid
    $scope.userGridOptions = {
        data:'adminUserList',
        rowHeight:50,
        columnDefs: [
            {field:'name', displayName:'Name',width:200,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'name\') }}</span></div>'},
            {field:'login_id', displayName:'Login ID',width:200,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'login_id\') }}</span></div>'},
            {field:'email', displayName:'Email ID',width:200,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'email\') }}</span></div>'},
            {field:'edit', displayName:'Edit',width:50,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-pencil fa-fw" ng-click="onUserEdit(row)"></i></a></div>'},
            {field:'reset', displayName:'Reset Password',width:150,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-pencil fa-fw" ng-click="resetPassword(row)"></i></a></div>'},
            {field:'delete', displayName:'Delete',width:75,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-trash-o fa-fw" ng-click="onUserDelete(row)"></i></a></div>'}
        ],
        multiSelect: false,
        enableRowSelection:false,
        selectedItems: []
    };
});
