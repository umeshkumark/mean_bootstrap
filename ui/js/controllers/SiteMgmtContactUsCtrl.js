/* 
 * file - SiteMgmtContactUsCtrl.js 
 * desc - Angular Controller for the Contact Us submenu under Site Management Menu
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.controller('SiteMgmtContactUsCtrl',function($scope,contactusService){
    console.log('SiteMgmtContactUsCtrl');
    
    $scope.contactID = "";
    
    $scope.address={
        address_line1:"",
        address_line2:"",
        address_line3:"",
        phone_no1:"",
        phone_no2:""
    };
    
    $scope.map={
        latitude:"",
        longitude:"",
        zoom:""
    };
    
    $scope.socialID={
        twitter_id:"",
        fb_id:"",
        gplus_id:""
    };
    
    // get the contact details
    var contactDetails =contactusService.getContactUsInfo();
    contactDetails.then(function(response){
        console.dir(response);
        if(response!= null && response.length>0){
            var data = response[0];
            $scope.contactID = data._id; 
            $scope.address.address_line1=data.address_line1;
            $scope.address.address_line2=data.address_line2;
            $scope.address.address_line3=data.address_line3;
            $scope.address.phone_no1=data.phone_no1;
            $scope.address.phone_no2=data.phone_no2;
            $scope.map.latitude=data.latitude;
            $scope.map.longitude=data.longitude;
            $scope.map.zoom=data.zoom;
            $scope.socialID.twitter_id=data.twitter_id;
            $scope.socialID.fb_id=data.fb_id;
            $scope.socialID.gplus_id=data.gplus_id;
        }
        else {
            console.log('SiteMgmtContactUsCtrl#getContactUsInfo.No details exists');
        }
        
    });
    
    
    $scope.onSaveAddress = function(){
        console.log('SiteMgmtContactUsCtrl#saveAddress');
        var addressJSON={
            address_line1:$scope.address.address_line1,
            address_line2:$scope.address.address_line2,
            address_line3:$scope.address.address_line3,
            phone_no1:$scope.address.phone_no1,
            phone_no2:$scope.address.phone_no2,
        };
        var isSaved = contactusService.save(addressJSON,$scope.contactID,'address');
        isSaved.then(function(data){
            if(data){
                console.log('SiteMgmtContactUsCtrl#saveAddress#Success');
            }
            else {
                console.log('SiteMgmtContactUsCtrl#saveAddress#Error');
            }
        });
    };
    
    $scope.onSaveMap = function(){
        console.log('SiteMgmtContactUsCtrl#saveMap');
        var mapJSON={
            latitude:$scope.map.latitude,
            longitude:$scope.map.longitude,
            zoom:$scope.map.zoom
        };
        var isSaved = contactusService.save(mapJSON,$scope.contactID,'map');
        isSaved.then(function(data){
            if(data){
                console.log('SiteMgmtContactUsCtrl#saveMap#Success');
            }
            else {
                console.log('SiteMgmtContactUsCtrl#saveMap#Error');
            }
        });
    };
    
    $scope.onSaveSocialMedia = function(){
        console.log('SiteMgmtContactUsCtrl#saveSocialMedia');
        var socialJSON = {
            twitter_id:$scope.socialID.twitter_id,
            fb_id:$scope.socialID.fb_id,
            gplus_id:$scope.socialID.gplus_id
        };
        var isSaved = contactusService.save(socialJSON,$scope.contactID,'social');
        isSaved.then(function(data){
            if(data){
                console.log('SiteMgmtContactUsCtrl#saveSocialMedia#Success');
            }
            else {
                console.log('SiteMgmtContactUsCtrl#saveSocialMedia#Error');
            }
        });
    };
});


