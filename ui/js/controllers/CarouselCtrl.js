/* 
 * file - CarouselCtrl.js 
 * desc - Angular Controller for the Carousel screen in portal
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.controller('CarouselCtrl',function($scope,carouselService){
    console.log('meanBootstrapPortal#CarouselCtrl');
    $scope.carouselList = [];
    $scope.carouselInterval = 3000;
    var carousels = carouselService.getCarouselList();
    carousels.then(function(data){
        console.dir(data);
        $scope.carouselList = data;
    });
});

