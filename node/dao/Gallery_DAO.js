/* 
 * file - Gallery_DAO.js 
 * desc - DAO for CRUD operations for Gallery
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
// connection string for 'Album' collection
var albumCollection = null;
// connection string for 'Album_Images' collection
var albumImagesCollection = null;

exports.initGalleryDAO = function(dbConnURI){
    console.log('Gallery_DAO#initGaleryDAO');
    mongoDBConnURI = dbConnURI;
    albumCollection = mongojs.connect(mongoDBConnURI,["Album"]);
    albumImagesCollection = mongojs.connect(mongoDBConnURI,["Album_Images"]);
};

// function to get the list of all documents in the Album collection
exports.getAlbumList = function(successCB,errorCB){
    console.log('Gallery_DAO#getAlbumList');
    albumCollection.Album.find(function(error,albumList){
        if(error){
            console.log('Gallery_DAO#getAlbumList.Error - ' + error);
            errorCB(error);
        }
        else if(!albumList){
            console.log('Gallery_DAO#getAlbumList.Empty Album collection');
            successCB([]);
        }
        else {
            successCB(albumList);
        }
    });
};

// function to get the list of all documents in the Album_Images collection
exports.getAlbumImagesList = function(albumID,successCB,errorCB){
    console.log('Gallery_DAO#getAlbumImagesList');
    albumImagesCollection.Album_Images.find({album_id:albumID},function(error,albumImagesList){
        if(error){
            console.log('Gallery_DAO#getAlbumImagesList.Error - ' + error);
            errorCB(error);
        }
        else if(!albumImagesList){
            console.log('Gallery_DAO#getAlbumImagesList.Empty Album_Images collection');
            successCB([]);
        }
        else {
            successCB(albumImagesList);
        }
    });
};

// function to get the album document by its _id property from the Album collection
exports.getAlbumByID = function(albumID,successCB,errorCB){
    console.log('Gallery_DAO#getAlbumByID Album ID - ' + albumID);
    albumCollection.Album.find({_id:mongojs.ObjectId(albumID)},function(error,album){
        if(error){
            console.log('Gallery_DAO#getAlbumByID.Error - ' + error);
            errorCB(error);
        }
        else if(!album){
            console.log('Gallery_DAO#getAlbumByID.Could not find Album Collection by ID');
            successCB([]);
        }
        else {
            successCB(album);
        }
    });
};

// function to save the album document into the Album collection
exports.saveAlbum = function(albumJSON,successCB,errorCB){
    console.log('Gallery_DAO#saveAlbum');
    albumCollection.Album.save(albumJSON,function(error,savedDoc){
        if(error){
            console.log("Gallery_DAO#saveAlbum.Error - " + error);
            errorCB(error);
        }
        else if (!savedDoc) {
            console.log("Gallery_DAO#saveAlbum.Unable to save");
            successCB(null);
        }
        else {
            successCB(savedDoc);
        }
    });
};

// function to delete the album document matching the _id from the Album collection
exports.deleteAlbum = function(albumID,successCB,errorCB){
    console.log('Gallery_DAO#deleteAlbum Album ID - ' + albumID);
    // Delete the corresponding Album_Images document & delete the Album document 
    // Delete the Album_Images document
    albumImagesCollection.Album_Images.remove({album_id:albumID},function(error){
        if(error) {
            console.log("Gallery_DAO#deleteAlbum.Error when deleting Album_Images document - "  +error);
            errorCB(error);
        }
        else {
            // Delete the Album document
            albumCollection.Album.remove({_id:mongojs.ObjectId(albumID)},function(error){
                if(error){
                    console.log("Gallery_DAO#deleteAlbum.Error when deleting the Album document - " + error);
                    errorCB(error);
                }
                else {
                    successCB();
                }
            });
        } // end of else block
    });
};

// function to delete the document matching the _id in Album_Images collection
exports.deleteAlbumImage = function(albumImageID,successCB,errorCB){
    console.log('Gallery_DAO#deleteAlbumImage Album ID - ' + albumImageID);
    albumImagesCollection.Album_Images.remove({_id:mongojs.ObjectId(albumImageID)},function(error){
        if(error) {
            console.log("Gallery_DAO#deleteAlbumImage.Error when deleting Album_Images document - "  +error);
            errorCB(error);
        }
        else {
            successCB();
        }
    });
};

// function to update the album document matching the _id
exports.updateAlbum = function(albumID,albumJSON,successCB,errorCB){
    console.log('Gallery_DAO#updateAlbum Album ID - ' + albumID);
    albumCollection.Album.update({_id:mongojs.ObjectId(albumID)},albumJSON,function(error,updatedDoc){
        if(error){
            console.log("Gallery_DAO#updateAlbum.Error - " + error);
            errorCB(error);
        }
        else if (!updatedDoc) {
            console.log("Gallery_DAO#updateAlbum.Unable to update");
            successCB([]);
        }
        else {
            successCB(updatedDoc);
        }
     });
};

// function to get the Album_Images document matching the album_id
exports.getAlbumImagesByAlbumID = function(albumID,successCB,errorCB){
    console.log('Gallery_DAO#getAlbumImagesByAlbumID Album ID - ' + albumID);
    albumImagesCollection.Album_Images.find({album_id:mongojs.ObjectId(albumID)},function(error,album){
        if(error){
            error('Gallery_DAO#getAlbumImagesByAlbumID.Error - ' + error);
            errorCB(error);
        }
        else if(!album) {
            error("Unable to find Album matching the ID in Album_Images" + albumID);
            successCB([]);
        }
        else {
            successCB(album);
        }
    });
};

// function to get the Album_Images document matching the _id
exports.getAlbumImagesByID = function(albumImageID,successCB,errorCB){
    console.log('Gallery_DAO#getAlbumImagesByID Album ID - ' + albumImageID);
    albumImagesCollection.Album_Images.find({_id:mongojs.ObjectId(albumImageID)},function(error,albumImage){
        if(error){
            error('Gallery_DAO#getAlbumImagesByID.Error - ' + error);
            errorCB(error);
        }
        else if(!albumImage) {
            error("Gallery_DAO#getAlbumImagesByID.Unable to find Album Image matching the ID in Album_Images" + albumImage);
            successCB([]);
        }
        else {
            successCB(albumImage);
        }
    });
};

// function to save the document into the Album_Images collection
exports.saveAlbumImage = function(albumImageJSON,successCB,errorCB){
    console.log('Gallery_DAO#saveAlbumImage');
    albumImagesCollection.Album_Images.save(albumImageJSON,function(error,savedDoc){
        if(error){
            console.log('Gallery_DAO#saveAlbumImage.Error - ' + error);
            errorCB(error);
        }
        else if (!savedDoc) {
            console.log('Gallery_DAO#saveAlbumImage.Unable to save Image - ');
            successCB([]);
        }
        else {
            successCB(savedDoc);
        }
    });
    console.dir(albumImageJSON);
};

// function to update the documet matching the album_id in the Album_Images collection
exports.updateAlbumImage = function(albumImageID,albumImageJSON,successCB,errorCB){
    console.log('Gallery_DAO#updateAlbumImage Album_Image ID - ' + albumImageID);
    console.dir(albumImageJSON);
};
