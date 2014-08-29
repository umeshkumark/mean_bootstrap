/* 
 * file - GalleryDirective.js 
 * desc - Angular Directive for dispalying Gallery as thumbnails with album description
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.directive('gallery',function(galleryService){
    console.log('meanBootstrapPortal#gallery');
    return{
        restrict: 'EA',
        link: function(scope,element,attributes){
            // get the album's _id from mm-album-id
            var albumID = attributes.albumId;
            console.log('meanBootstrapPortal#gallery Album ID - ' + albumID);
            var album = galleryService.getAlbumImagesList(albumID);
            album.then(function(data){
                scope.albumImages = data;
            });
        }
    };
});
