/* 
 * file - CarouselService.js 
 * desc - Angular Service for the Controllers defined in controller/CarouselCtrl.js & controller/SiteMgmtCarouselCtrl.js
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.factory('carouselService', function($http) {
    console.log('meanBootstrapPortal#carouselService');
    return {
        getCarouselList:function(){
            // function to get the list of documents from Carousel collection
            console.log('CarouselService#getCarouselList');
            var promise = $http.get('/rest/api/home/carousels').then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('CarouselService#getCarouselList.Error - ' + error);
            });
            return promise;
        },
        getCarouselByID:function(carouselID){
            // function to get the document matching the _id in Carousel collection
            console.log('CarouselService#getCarouselByID Carousel ID - ' + carouselID);
            var promise = $http.get('/rest/api/home/carousel/'+carouselID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('CarouselService#getCarouselByID.Error - ' + error);
            });
            return promise;
        },
        saveCarousel:function(carouselImageForm){
            // function to save a document into Carousel collection
            console.log('CarouselService#saveCarousel');
            var promise = $http.post('/rest/api/home/saveCarousel', carouselImageForm, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(response){
                console.dir(response);
                return response.data;
            },function(error){
                console.log('CarouselService#saveCarousel.Error - ' + error);
            });
            return promise;
        },
        deleteCarousel:function(carouselID){
            // function to delete a document from Carousel collection
            console.log('CarouselService#deleteCarousel.Carousel ID - ' + carouselID);
            var promise = $http.delete('/rest/api/home/deleteCarousel/'+carouselID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('GalleryService#deleteCarousel.Error - ' + error);
            });
            return promise;
        },
        updateCarousel:function(carouselID,carouselImageForm){
            // function to update the document matching the _id in Carousel collection
            console.log('CarouselService#updateCarousel');
            var promise = $http.post('/rest/api/home/updateCarousel/'+carouselID, carouselImageForm, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .then(function(response){
                console.dir(response);
                return response.data;
            },function(error){
                console.log('CarouselService#updateCarousel.Error - ' + error);
            });
            return promise;
        }
    };
});
