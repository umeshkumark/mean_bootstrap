/* 
 * file - Main_Routes.js 
 * desc - Routes the rest api calls to the handler function
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */


var path = require('path');

module.exports = function(app,currentDir,mongoDBConnURI) {
    
    console.log('Main_Routes.js#Mongo DB Connection URI - ' + mongoDBConnURI);
    // Carousel Route File
    var carouselRoutes = require('./Carousel_Routes.js');
    carouselRoutes.initCarousel(currentDir,mongoDBConnURI);
    
    // Gallery Route File
    var galleryRoutes = require('./Gallery_Routes.js');
    galleryRoutes.initGallery(currentDir,mongoDBConnURI);
    
    // Blog Route File
    var blogRoutes = require('./Blog_Routes.js');
    blogRoutes.initBlog(currentDir,mongoDBConnURI);
    
    // Admin Route File
    var adminRoutes = require('./Admin_Routes.js');
    adminRoutes.initAdmin(currentDir,mongoDBConnURI);
    
    // ContactUs Route File
    var contactUsRoutes = require('./ContactUs_Routes.js');
    contactUsRoutes.initContactUs(currentDir,mongoDBConnURI);
    
    // Default Route
    app.get('/',function(request,response){
        console.log('Main_Routes.js#/');
    	var indexHTML = path.join(currentDir,'ui','index.html');
    	console.log('Main_Routes.js index html path = ' + indexHTML);
    	response.sendFile(indexHTML);
    });
    
    // Gallery Routes
    app.get('/rest/api/gallery/albums',galleryRoutes.getAlbumList);
    app.get('/rest/api/gallery/albumImages/:id',galleryRoutes.getAlbumImagesList);
    app.get('/rest/api/gallery/album/:id?',galleryRoutes.getAlbumByID);
    app.post('/rest/api/galery/saveAlbum',galleryRoutes.saveAlbum);
    app.post('/rest/api/gallery/saveAlbumImages',galleryRoutes.saveAlbumImages);
    app.delete('/rest/api/gallery/deleteAlbum/:id?',galleryRoutes.deleteAlbum);
    app.post('/rest/api/gallery/updateAlbum/:id?',galleryRoutes.updateAlbum);
    app.delete('/rest/api/gallery/deleteAlbumImage/:id?',galleryRoutes.deleteImagesFromDisk);
    
    // Carousel Routes
    app.get('/rest/api/home/carousels',carouselRoutes.getCarouselList);
    app.get('/rest/api/home/carousel/:id?',carouselRoutes.getCarouselByID);
    app.post('/rest/api/home/saveCarousel',carouselRoutes.saveCarousel);
    app.delete('/rest/api/home/deleteCarousel/:id?',carouselRoutes.deleteCarousel);
    app.post('/rest/api/home/updateCarousel/:id?',carouselRoutes.updateCarousel);
    
    // Blog Routes
    app.get('/rest/api/blog/sections',blogRoutes.getSectionList);
    app.get('/rest/api/blog/list/:sectionID',blogRoutes.getBlogList);
    app.get('/rest/api/blog/list/sortByDate/:sectionID?',blogRoutes.sortBlogByCreationDate);
    app.get('/rest/api/blog/blogDetails/:blogID?',blogRoutes.getBlogDetails);
    app.post('/rest/api/blog/save',blogRoutes.saveBlog);
    app.post('/rest/api/blog/update/:blogID?',blogRoutes.updateBlog);
    app.delete('/rest/api/blog/delete/:blogID?/:sectionID?',blogRoutes.deleteBlog);
    
    // Admin Routes
    app.get('/rest/api/admin/adminUsers',adminRoutes.getAdminUserList);
    app.get('/rest/api/admin/superAdminUsers',adminRoutes.getSuperAdminUserList);
    app.get('/rest/api/admin/user/:userID',adminRoutes.getUserByID);
    app.get('/rest/api/admin/login/:loginID',adminRoutes.getUserByLoginID);
    app.post('/rest/api/admin/saveUser',adminRoutes.saveUser);
    app.post('/rest/api/admin/updateUser/:userID?',adminRoutes.updateUser);
    app.delete('/rest/api/admin/deleteUser/:userID?',adminRoutes.deleteUser);
    app.post('/rest/api/admin/resetPassword/:userID?',adminRoutes.resetPassword);
    app.post('/rest/api/admin/login/:loginID?/:password?',adminRoutes.authenticateUser);
    app.post('/rest/api/user/changePassword/:loginID?/:password?',adminRoutes.changeUserPassword);
    
    
    //app.post('/rest/api/user/modifyPassword/:loginID?/:password',adminRoutes.modifyPassword);
    
    // ContactUs Routes
    app.get('/rest/api/contact/contactUs',contactUsRoutes.getContactUsDetails);
    app.post('/rest/api/contact/save/:type?',contactUsRoutes.saveContactUsDetails);
    app.post('/rest/api/contact/save/:type?/:contactID?',contactUsRoutes.saveContactUsDetails);
    
};


