/* 
 * file - BlogService.js 
 * desc - Angular Service for the Controllers defined in controller/BlogCtrl.js & controller/SiteMgmtBlogCtrl.js
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.factory('blogService', function($http) {
    console.log('MeanBootStrapPortal#BlogService.js');
    return {
        getBlogSectionList:function(){
            // function that returns the different sections defined for the portal
            console.log('BlogService#getBlogSectionList');
            var promise = $http.get('/rest/api/blog/sections').then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('BlogService#getBlogSectionList.Error - ' + error);
            });
            return promise;
        },
        getBlogList:function(sectionID){
            // function that returns the list of all documents in Blog collection matching the section_id
            console.log('BlogService#getBlogList Section ID - ' + sectionID);
            var promise = $http.get('/rest/api/blog/list/'+sectionID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('BlogService#getBlogList.Error - ' + error);
            });
            return promise;
        },
        getSortedBlogList:function(sectionID){
            // function that returns the list of all documents in Blog collection matching the section_id 
            // sorted by Creation Date
            console.log('BlogService#getSortedBlogList Section ID - ' + sectionID);
            var promise = $http.get('/rest/api/blog/list/sortByDate/'+sectionID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('BlogService#getSortedBlogList.Error - ' + error);
            });
            return promise;
        },
        getBlogDetails:function(blogID){
            // function that returns the document in Blog collection matching the _id
            console.log('BlogService#getBlogDetails Blog ID - ' + blogID);
            var promise = $http.get('/rest/api/blog/blogDetails/'+blogID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('BlogService#getBlogDetails.Error - ' + error);
            });
            return promise;
        },
        saveBlog:function(blogJSON){
            // function to add a document to the Blog collection
            console.log('BlogService#saveBlog.BlogJSON:');
            console.dir(blogJSON);
            var promise = $http({
                method:'POST',
                url:'/rest/api/blog/save',
                data:blogJSON
            }).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('BlogService#saveBlog.Error - ' + error);
            });
            return promise;
        },
        updateBlog:function(blogJSON,blogID){
            // function to update a document to the Blog collection matching the _id
            console.log('BlogService#updateBlog.Blog ID - ' + blogID + ' blogJSON:');
            console.dir(blogJSON);
            var promise = $http({
                method:'POST',
                url:'/rest/api/blog/update/'+blogID,
                data:blogJSON
            }).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('BlogService#updateBlog.Error - ' + error);
            });
            return promise;
        },
        deleteBlog:function(blogID,sectionID){
            // function to delete the document in Blog collection matching the _id
            console.log('BlogService#deleteBlog.Blog ID - ' + blogID + ' Section ID - ' + sectionID);
            var promise = $http.delete('/rest/api/blog/delete/'+blogID+'/'+sectionID).then(function(response){
                return response.data;
            },function(error){
                // Error Handler
                console.log('BlogService#deleteBlog.Error - ' + error);
            });
            return promise;
        }
    };
});

