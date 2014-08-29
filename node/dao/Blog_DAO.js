/* 
 * file - Gallery_DAO.js 
 * desc - DAO for CRUD operations for Blogs/Articles
 * 
 * successCB - successCallBack function.
 * errorCB - errorCallBack function.
 * 
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 * 
 */

// MongoJS driver
var mongojs = require('mongojs');
// mongodb connection URI
var mongoDBConnURI = null;
// connection string for 'Blog' collection
var blogCollection = null;

exports.initBlogDAO = function(dbConnURI){
    console.log('Blog_DAO#initBlogDAO');
    mongoDBConnURI = dbConnURI;
    blogCollection = mongojs.connect(mongoDBConnURI,["Blog"]);
};

// Function to get the list of all Blog Sections
exports.getBlogSectionList = function(successCB){
    console.log('Blog_DAO#getBlogSectionList');
    var sections = [
        {
            _id:1,
            sectionName:'Articles'
        }
    ];
    successCB(sections);
};

// Function to get the list of all documents from the Blog Collection
exports.getBlogList = function(sectionID,successCB,errorCB){
    console.log('Blog_DAO#getBlogList Section ID - ' + sectionID);
    blogCollection.Blog.find({section_id:sectionID},function(error,blogList){
        if(error) {
            console.log("Blog_DAO#getBlogList.Error - " + error);
            errorCB(error);
        }
        else if (!blogList) {
            console.log("Blog_DAO#getBlogList.No Blog exists in DB");
            successCB(null);
        }
        else {
            successCB(blogList);
        }
    });
};

// Function to get the list of all documents from the Blog Collection sorted by the Criteria
exports.getSortedBlogList = function(sectionID,sortCriteria,successCB,errorCB){
    console.log('Blog_DAO#getSortedBlogList Section ID - ' + sectionID + ' Sort Criteria - ' + sortCriteria);
    blogCollection.Blog.find({section_id:sectionID}).sort(sortCriteria,function(error,blogList){
        if(error) {
            console.log("Blog_DAO#getSortedBlogList.Error - " + error);
            errorCB(error);
        }
        else if (!blogList) {
            console.log("Blog_DAO#getSortedBlogList.No Blog exists in DB");
            successCB(null);
        }
        else {
            successCB(blogList);
        }
    });
};

exports.getBlogDetails = function(blogID,successCB,errorCB){
    console.log('Blog_DAO#getBlogDetails');
    blogCollection.Blog.find({_id:mongojs.ObjectId(blogID)},function(error,blog){
        if(error) {
            console.log("Blog_DAO#getBlogDetails.Error - " + error);
            errorCB(error);
        }
        else if (!blog) {
            console.log("Blog_DAO#getBlogDetails.No Blog exists in DB");
            successCB(null);
        }
        else {
            successCB(blog);
        }
    });
};

// function to save the document into the Blog Collection
exports.saveBlog = function(blogJSON,successCB,errorCB){
    console.log('Blog_DAO#saveBlog');
    blogCollection.Blog.save(blogJSON,function(error,savedDoc){
        if(error){
            console.log("Blog_DAO#saveBlog.Error - " + error);
            errorCB(error);
        }
        else if (!savedDoc) {
            console.log("Blog_DAO#saveBlog.Unable to save");
            successCB([]);
        }
        else {
            successCB(savedDoc);
        }
    });
};

// function to delete the document matching the _id in the Blog Collection
exports.deleteBlog = function(blogID,successCB,errorCB){
    console.log('Blog_DAO#deleteBlog');
     blogCollection.Blog.remove({_id:mongojs.ObjectId(blogID)},function(error){
        if(error) {
            console.log("Blog_DAO#deleteBlog.Error - " + error);
            errorCB(error);
        }
        else {
            successCB();
        }
    });
};

// function to update the document matching the _id in the Blog Collection
exports.updateBlog = function(blogID,blogJSON,successCB,errorCB){
    console.log('Blog_DAO#updateBlog Blog ID - ' + blogID);
    blogCollection.Blog.update({_id:mongojs.ObjectId(blogID)},blogJSON,function(error,updatedDoc){
        if(error){
            console.log("Blog_DAO#updateBlog.Error - " + error);
            errorCB(error);
        }
        else if (!updatedDoc) {
            console.log("Blog_DAO#updateBlog.Unable to update");
            successCB([]);
        }
        else {
            successCB(updatedDoc);
        }
    });
};

