/* 
 * file - ContactUsCtrl.js 
 * desc - Angular Controller for the ContactUs screen in the portal
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.controller('ContactUsCtrl',function($scope,contactusService){
    console.log('ContactUsCtrl');
    
    // Default values
    $scope.googleMapOptions={
        center: {
            latitude: '',
            longitude: ''
        },
        zoom: 0
    };
                
    $scope.address={
        address_line1:"",
        address_line2:"",
        address_line3:"",
        phone_no1:"",
        phone_no2:""
    };
    
    $scope.social={
        twitter_id:"",
        fb_id:"",
        gplus_id:""
    };
    
    $scope.map={
        latitude:"",
        longitude:"",
        zoom:""
    };
  
    // Get the document from ContactUs collection
    var contactDetails = contactusService.getContactUsInfo();
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
            $scope.googleMapOptions={
                center: {
                    latitude: data.latitude,
                    longitude: data.longitude
                },
                zoom: parseInt(data.zoom, 10)
            };
            $scope.social.twitter_id=data.twitter_id;
            $scope.social.fb_id=data.fb_id;
            $scope.social.gplus_id=data.gplus_id;
            console.dir($scope.googleMapOptions);
        }
        else {
            console.log('SiteMgmtContactUsCtrl#getContactUsInfo.No details exists');
        }
    });
    
    
    
});
