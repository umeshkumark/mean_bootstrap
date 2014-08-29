/* 
 * file - BlogCtrl.js 
 * desc - Angular Controller for the Blog screen in portal
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */


meanBootstrapPortal.controller('BlogCtrl',function($scope,blogService){
    console.log('BlogCtrl...');
    $scope.blogList = [];
    
    // Get the list of all blogs sorted by creation date
    var blogs = blogService.getSortedBlogList(1);
    blogs.then(function(data){
        console.log('BlogCtrl#No of Blogs returned : ' + data.length);
        console.dir(data);
        $scope.blogList = data;
    });
});