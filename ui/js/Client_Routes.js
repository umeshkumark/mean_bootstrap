/* 
 * file - Client_Routes.js 
 * desc - Definition for the Angular Routes for meanbootstrapportal
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

var ClientRoutes = function($routeProvider,$locationProvider){
    console.log('Client_Routes.js');
    $routeProvider
        .when('/site_mgmt_blogs',{
            templateUrl: 'views/Site_Mgmt_Blog.html'
        })
        .when('/site_mgmt_gallery',{
            templateUrl: 'views/Site_Mgmt_Gallery.html'
        })
        .when('/site_mgmt_carousel',{
            templateUrl: 'views/Site_Mgmt_Carousel.html'
        })
        .when('/site_mgmt_contactus',{
            templateUrl: 'views/Site_Mgmt_ContactUs.html'
        })
        .when('/site_mgmt_users',{
            templateUrl: 'views/Site_Mgmt_User.html'
        })
        .when('/blogs',{
            templateUrl: 'views/Blog.html'
        })
        .when('/gallery',{
            templateUrl: 'views/Gallery.html'
        })
        .when('/carousel',{
            templateUrl: 'views/Carousel.html'
        })
        .when('/contactus',{
            templateUrl: 'views/ContactUs.html'
        })
        .when('/login',{
            templateUrl: 'views/Login.html'
        })
         .when('/user_profile',{
            templateUrl: 'views/UserProfile.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
};


