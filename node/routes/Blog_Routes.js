/* 
 * file - Blog_Routes.js 
 * desc - Rest API calls for all routes meant for Blogs/Articles
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */


var mongoDBConnURI = "";
var currentDir = "";
var carouselDAO = null;
var path = require('path');
var fs = require('fs');

exports.initBlog = function(curDir,dbConnURI){
    console.log('Blog_Routes curDir - ' + curDir + ' dbConnURI - ' + dbConnURI);
    mongoDBConnURI = dbConnURI;
    currentDir = curDir;
    // Initialize DAO
    var blogDAOPath = path.join(currentDir,'node','dao','Blog_DAO.js');
    console.log('Blog_Routes#Blog_DAO path - ' + blogDAOPath);
    blogDAO = require(blogDAOPath);
    blogDAO.initBlogDAO(dbConnURI);
};

// REST API endpoint to get the list of Sections
exports.getSectionList = function(request,response){
    console.log('Blog_Routes#getSectionList');
    blogDAO.getBlogSectionList(function(sectionList){
        console.log("Blog_Routes#getSectionList.The no of sections retrieved from DB - " + sectionList.length);
        response.json(sectionList);
    },function(error){
        console.log("Blog_Routes#getSectionList.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to get the list of documents from the Blog Collection matching the section_id 
exports.getBlogList = function(request,response){
    console.log('Blog_Routes#getBlogList');
    var sectionID = request.params.sectionID;
    blogDAO.getBlogList(sectionID,function(blogList){
        console.log("Blog_Routes#getBlogList.The no of blogs retrieved from DB - " + blogList.length);
        response.json(blogList);
    },function(error){
        console.log("Blog_Routes#getBlogList.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to get the list of documents from the Blog Collection sorted by Creation Date
exports.sortBlogByCreationDate = function(request,response) {
    console.log('Blog_Routes#sortBlogByCreationDate');
    var sectionID = request.params.sectionID;
    var sortCriteria = {creationDate:1};
    blogDAO.getSortedBlogList(sectionID,sortCriteria,function(blogList){
        console.log("Blog_Routes#sortBlogByCreationDate.The no of blogs retrieved from DB - " + blogList.length);
        response.json(blogList);
    },function(error){
        console.log("Blog_Routes#sortBlogByCreationDate.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to get the document matching the _id in the Blog Collection
exports.getBlogDetails = function(request,response){
    console.log('Blog_Routes#getBlogDetails');
    var blogID = request.params.contentID;
    blogDAO.getBlogDetails(blogID,function(blogList){
        console.log("The no of blogs retrieved from DB - " + blogList.length);
        response.json(blogList);
    },function(error){
        console.log("Blog_Routes#getBlogDetails.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to save the document to the Blog Collection
exports.saveBlog = function(request,response){
    console.log('Blog_Routes#saveBlog');
    var blogJSON = request.body;
    console.dir(blogJSON);
    var sectionID = blogJSON.sectionID;
    var newBlogJSON = {
        section_id:sectionID,
        blog_html:blogJSON.blogText,
        creationDate:new Date(),
        updationDate:new Date()
    };
    blogDAO.saveBlog(newBlogJSON,function(blog){
        console.log("Blog_Routes#saveBlog.Saved Blog - " + blog);
        // Get the list of Cotnents
       blogDAO.getBlogList(sectionID,function(blogList){
            console.log("Blog_Routes#saveBlog.The no of blogs retrieved from DB - " + blogList.length);
            response.json(blogList);
        },function(error){
            console.log("Blog_Routes#saveBlog.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Blog_Routes#saveBlog.Error - " + error);
    });
};

// REST API endpoint to update the document matching the _id in the Blog Collection
exports.updateBlog = function(request,response){
    console.log('Blog_Routes#updateBlog');
    var blogJSON = request.body;
    var blogID = request.params.blogID;
    var sectionID = blogJSON.sectionID;
    var newBlogJSON = {
        section_id:sectionID,
        blog_html:blogJSON.blogText,
        creationDate:blogJSON.creationDate,
        updationDate:new Date()
    };
    blogDAO.updateBlog(blogID,newBlogJSON,function(blog){
        console.log("Blog_Routes#updateBlog.Updated Blog - " + blog);
        // Get the list of Cotnents
        blogDAO.getBlogList(sectionID,function(blogList){
            console.log("Blog_Routes#updateBlog.The no of blogs retrieved from DB - " + blogList.length);
            response.json(blogList);
        },function(error){
            console.log("Blog_Routes#updateBlog.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Blog_Routes#updateBlog.Error - " + error);
    });
};

// REST API endpoint to delete the document matching the _id from the Blog Collection
exports.deleteBlog = function(request,response){
    console.log('Blog_Routes#deleteBlog');
    var blogID = request.params.blogID;
    var sectionID = request.params.sectionID;
    blogDAO.deleteBlog(blogID,function(){
        blogDAO.getBlogList(sectionID,function(blogList){
            console.log("Blog_Routes#updateBlog.The no of blogs retrieved from DB - " + blogList.length);
            response.json(blogList);
        },function(error){
            console.log("Blog_Routes#updateBlog.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Blog_Routes#updateBlog.Error - " + error);
        response.json([]);
    });
};




