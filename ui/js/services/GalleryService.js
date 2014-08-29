/* 
 * file - GalleryService.js 
 * desc - Angular Service for Controllers defined in controller/GalleryCtrl.js & controller/SiteMgmtGalleryCtrl.js
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.factory('galleryService', function($http) {
    console.log('meanBootstrapPortal#GalleryService');
    return {
        getAlbumList:function(){
            // function that returns the list of albums defined for the portal
            console.log('GalleryService#getAlbumList');
            var promise = $http.get('/rest/api/gallery/albums').then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('GalleryService#getAlbumList.Error - ' + error);
            });
            return promise;
        },
        getAlbumDetailsByID:function(albumID){
            // function to get the document from Album collection matching the _id
            console.log('GalleryService#getAlbumDetailsByID Album ID - ' + albumID);
            var promise = $http.get('/rest/api/gallery/album/'+albumID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('GalleryService#getAlbumList.Error - ' + error);
            });
            return promise;
        },
        getAlbumImagesList:function(albumID){
            // function to get the list of documents in Album_Images collection matching the 
            // album_id
            console.log('GalleryService#getAlbumImagesList Album ID - ' + albumID);
            var promise = $http.get('/rest/api/gallery/albumImages/'+albumID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('GalleryService#getAlbumImagesList.Error - ' + error);
            });
            return promise;
        },
        saveAlbum:function(albumJSON){
            // function to add a document to Album collection
            console.log('GalleryService#saveAlbum');
            var promise = $http({
                method:'POST',
                url:'/rest/api/galery/saveAlbum',
                data:albumJSON
            }).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('GalleryService#saveAlbum.Error - ' + error);
            });
            return promise;
        },
        updateAlbum:function(albumJSON,albumID){
            // function to update a document in Album collection
            console.log('GalleryService#updateAlbum Album ID - ' + albumID);
            var promise = $http({
                method:'POST',
                url:'/rest/api/gallery/updateAlbum/'+albumID,
                data:albumJSON
            }).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('GalleryService#updateAlbum.Error - ' + error);
            });
            return promise;
        },
        deleteAlbum:function(albumID){
            // function to delete a document from Album collection
            console.log('GalleryService#deleteAlbum Album ID - ' + albumID);
            var promise = $http.delete('/rest/api/gallery/deleteAlbum/'+albumImageID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('GalleryService#deleteAlbum.Error - ' + error);
            });
            return promise;
        },
        uploadAlbumImage:function(albumImageForm){
            // function to upload an Image to a Album
            console.log('GalleryService#uploadAlbumImage');
            var promise = $http.post('/rest/api/gallery/saveAlbumImages', albumImageForm, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(response){
                console.dir(response);
                return response.data;
            },function(error){
                console.log('GalleryService#uploadAlbumImage.Error - ' + error);
            });
            return promise;
        },
        deleteAlbumImage:function(albumImageID){
            // function to delete an Image from an Album
            console.log('GalleryService#deleteAlbumImage Album Image ID - ' + albumImageID);
            var promise = $http.delete('/rest/api/gallery/deleteAlbumImage/'+albumImageID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('GalleryService#deleteAlbumImage.Error - ' + error);
            });
            return promise;
        }
        
    };
});

