/* 
 * file - GalleryCtrl.js 
 * desc - Angular Controller for the Gallery screen in the portal
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.controller('GalleryCtrl',function($scope,galleryService){
    console.log('GalleryCtrl');
    
    $scope.carouselInterval = 3000;
    $scope.albumImagesList = [];
    $scope.albumList = [];
    // Load the list of albums
    var albums = galleryService.getAlbumList();
    albums.then(function(data){
        console.log('GalleryCtrl#No of Albums - ' + data.length);
        $scope.albumList = data;
    });
    
    $scope.loadAlbumImages = function(albumImages){
        console.log('GalleryCtrl#loadAlbumImages');
        $scope.albumImagesList = albumImages;
    };
    
    
});

