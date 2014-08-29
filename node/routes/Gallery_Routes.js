/* 
 * file - Gallery_Routes.js 
 * desc - Rest API calls for all routes meant for Gallery
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

var mongoDBConnURI = "";
var currentDir = "";
var galleryDAO = null;
var path = require('path');
var fs = require('fs');

exports.initGallery = function(curDir,dbConnURI){
    console.log('Galery_Routes curDir - ' + curDir + ' dbConnURI - ' + dbConnURI);
    mongoDBConnURI = dbConnURI;
    currentDir = curDir;
    // Initialize DAO
    var galleryDAOPath = path.join(currentDir,'node','dao','Gallery_DAO.js');
    console.log('Gallery_Routes#Gallery_DAO path - ' + galleryDAOPath);
    galleryDAO = require(galleryDAOPath);
    galleryDAO.initGalleryDAO(dbConnURI);
};

// REST API endpoint to get the list of documents from Album collection
exports.getAlbumList = function(request,response){
    console.log('Gallery_Routes#getAlbumList');
    galleryDAO.getAlbumList(function(albumList){
        console.log("Gallery_Routes#getAlbumList.No of albums retrieved from DB - " + albumList.length);
        response.json(albumList);
    },function(error){
        console.log("Gallery_Routes#getAlbumList.Error:" + error);
        response.json([]);
    });
};

// REST API endpoint to get the list of documents from Album_Images collection
exports.getAlbumImagesList = function(request,response){
    console.log('Gallery_Routes#getAlbumImagesList');
    var albumID = request.params.id;
    galleryDAO.getAlbumImagesList(albumID,function(albumImagesList){
        console.log("Gallery_Routes#getAlbumImagesList.The no of albums Images retrieved from DB - " + albumImagesList.length);
        response.json(albumImagesList);
    },function(error){
        console.log("Gallery_Routes#getAlbumImagesList.Error:" + error);
        response.json([]);
    });
};

// REST API endpoint to get the document from Album collection matching the _id
exports.getAlbumByID = function(request,response){
    console.log('Gallery_Routes#getAlbumByID');
    var albumID = request.params.id;
    galleryDAO.getAlbumByID(albumID,function(album){
        response.json(album);
    },function(error){
        console.log("Gallery_Routes#getAlbumByID.Error - " + error);
        response.json({});
    });
};

// REST API endpoint to save the document into Album collection
exports.saveAlbum = function(request,response){
    console.log('Gallery_Routes#saveAlbum');
    // album details are passed as JSON in the request body
    var albumJSON = request.body;
    console.dir(albumJSON);
    var newAlbumJSON = {
        name:albumJSON.name,
        desc:albumJSON.desc,
        creationDate: new Date(),
        updationDate:new Date()
    };
    console.dir(newAlbumJSON);
    // Save
    galleryDAO.saveAlbum(newAlbumJSON,function(album){
        console.log("Gallery_Routes#saveAlbum.Saved Album:");
        console.dir(album);
        // Get the list of documents from Album Collection
        galleryDAO.getAlbumList(function(albumList){
            console.log("Gallery_Routes#saveAlbum.No of albums - " + albumList.length);
            response.json(albumList);
        },function(error){
            console.log("Gallery_Routes#saveAlbum.Error retrieving the list of albums.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Gallery_Routes#saveAlbum.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to save the document into Album_Images Collection
exports.saveAlbumImages = function(request,response){
    console.log('Gallery_Routes#saveAlbumImages');
    // Copy the uploaded image file & return the new path of the file
    // Copy the image
    var fullFileTempPath = request.files.file.path;
    var imageDesc = request.body.imageDesc;
    var albumID = request.body.album_id;
    console.log("Gallery_Routes#saveAlbumImages.Full Path - " + fullFileTempPath);
    var imageDbPath = path.join('uploaded_images','gallery',request.files.file.name);
    var copyToPath = path.join(currentDir,'ui','uploaded_images','gallery',request.files.file.name);
    console.log("Gallery_Routes#saveAlbumImages.Image will be copied to - " + copyToPath);
    var inFile = fs.createReadStream(fullFileTempPath);
    var outFile = fs.createWriteStream(copyToPath);
    inFile.pipe(outFile);
    
    var newAlbumImageJSON = {
        album_id:albumID,
        creationDate:new Date(),
        updationDate:new Date(),
        desc:imageDesc,
        image_path:imageDbPath
    };
    console.dir(newAlbumImageJSON);
    // Save Images 
    galleryDAO.saveAlbumImage(newAlbumImageJSON,function(albumImage){
        console.log("Gallery_Routes#saveAlbumImages.New Album Image - " + albumImage);
        galleryDAO.getAlbumImagesList(albumID,function(albumList){
            response.json(albumList);
            },function(error){
                console.log("Gallery_Routes#saveAlbumImages.Error -  " + error);
                response.json([]);
            });
    },function(error){
        console.log("Gallery_Routes#saveAlbumImages.Error - " + error);
        response.json([]);
    });
};

// function to delete the Images uploaded to server
deleteImagesFromAlbum = function(albumID) {
    console.log("deleteImagesFromAlbum Album ID - " + albumID);
    // get the list of images for the album from album_images collection
    var status = false;
    galleryDAO.getImagesFromAlbumID(albumID,function(photoList){
        console.log("Successfully deleted Images");
        for(image in photoList) {
            var imagePath = photoList[image].imagePath;
            var fileToDelete = path.join(currentDir,'ui',imagePath);
            console.log("Goind to delete Image " + fileToDelete);
            fs.unlink(fileToDelete, function (error) {
                if (error) {
                    console.log('unable to delete '  + fileToDelete);
                }else {
                    console.log('successfully deleted ' + fileToDelete);
                }
            });
        }
        status = true;
    },function(error){
        console.log("Error when deleting Images ... ");
    });
    return status;
};

// REST API endpoint to delete album & uploaded images  
exports.deleteAlbum = function(request,response) {
    console.log('Gallery_Routes#deleteAlbum');
    var albumID = request.params.id;
    console.log("Gallery_Routes#deleteAlbum album ID = " + albumID);
    // Delete the Images
    var isDeleted = deleteImagesFromAlbum(albumID);
    console.log('Gallery_Routes#deleteAlbum.Uploaded Images Deleted ? ' + isDeleted);
    // Delete
    galleryDAO.deleteAlbum(albumID,function(){
        // Get the list of albums
        galleryDAO.getAlbums(function(albumList){
                console.log("The no of albums retrieved from DB - " + albumList.length);
                response.json(albumList);
            },function(error){
                console.log("Gallery_Routes#deleteAlbum.Error - " + error);
                response.json([]);
            });
    },function(error){
        console.log("Gallery_Routes#deleteAlbum.Error - " + error);
        response.json([]);
    });
};

// REST API end point to update the Album 
exports.updateAlbum = function(request,response){
    console.log('Gallery_Routes#updateAlbum');
    var albumJSON = request.body;
    var albumID = request.params.id;
    console.dir(albumJSON);
    var newAlbumJSON = {
        name:albumJSON.name,
        desc:albumJSON.desc,
        creationDate: albumJSON.creationDate,
        updationDate:new Date()
    };
    console.dir(newAlbumJSON);
    galleryDAO.updateAlbum(albumID,newAlbumJSON,function(album){
        console.log("Gallery_Routes#updateAlbum.Updated Album :");
        console.dir(album);
        // Get the list of Albums
        galleryDAO.getAlbumList(function(albumList){
            console.log("The no of albums retrieved from DB - " + albumList.length);
            response.json(albumList);
        },function(error){
            console.log("Gallery_Routes#deleteAlbum.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Gallery_Routes#updateAlbum.Error - " + error);
    });
};

// REST API endpoint to delete all images uploaded to server
// This will be called when the user selects images to upload & then clicks on the Cancel button
exports.deleteImagesFromDisk = function(request,response){
    console.log('Gallery_Routes#deleteImagesFromDisk');
    var albumImageID = request.params.id;
    console.log("Gallery_Routes#deleteImagesFromDisk. Album Image ID  = " + albumImageID);
    // Get the Album Image details
    galleryDAO.getAlbumImagesByID(albumImageID,function(albumImage){
        console.dir(albumImage[0]);
        var albumID = albumImage[0].album_id;
        var albumImagePath = albumImage[0].image_path;
        // Delete the uploaded Image
        var fileToDelete = path.join(currentDir,'ui',albumImagePath);
        fs.unlink(fileToDelete, function (error) {
            if (error) {
                console.log('Gallery_Routes#deleteImagesFromDisk.Unable to delete '  + fileToDelete);
            }
            console.log('Gallery_Routes#deleteImagesFromDisk.Successfully deleted ' + fileToDelete);
        });
        // Delete the document from Album_Images collection
        galleryDAO.deleteAlbumImage(albumImageID,function(){
            galleryDAO.getAlbumImagesList(albumID,function(albumList){
                response.json(albumList);
                },function(error){
                    console.log("Gallery_Routes#deleteImagesFromDisk.Error -  " + error);
                    response.json([]);
                });
        },function(error){
            console.log("Gallery_Routes#deleteImagesFromDisk.Error -  " + error);
            response.json([]);
        });
    },function(error){
        console.log('Gallery_Routes#deleteImagesFromDisk.Could not get Album_Image Details');
        response.json([]);
    });
    
    
};
