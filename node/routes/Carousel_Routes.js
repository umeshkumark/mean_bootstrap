/* 
 * file - Carousel_Routes.js 
 * desc - Rest API calls for all routes meant for Carousel
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

var mongoDBConnURI = "";
var currentDir = "";
var carouselDAO = null;
var path = require('path');
var fs = require('fs');

exports.initCarousel = function(curDir,dbConnURI){
    console.log('Carousel_Routes curDir - ' + curDir + ' dbConnURI - ' + dbConnURI);
    mongoDBConnURI = dbConnURI;
    currentDir = curDir;
    // Initialize DAO
    var carouselDAOPath = path.join(currentDir,'node','dao','Carousel_DAO.js');
    console.log('Carousel_Routes#Carousel_DAO path - ' + carouselDAOPath);
    carouselDAO = require(carouselDAOPath);
    carouselDAO.initCarouselDAO(dbConnURI);
};

// REST API endpoint to get the list of all documents from Carousel collection
exports.getCarouselList = function(request,response){
    console.log('Carousel_Routes#getCarouselList');
    carouselDAO.getCarouselList(function(carouselList){
        console.log("Carousel_Routes#getCarouselList.The no of carousels retrieved from DB - " + carouselList.length);
        response.json(carouselList);
    },function(error){
        console.log("Home_Routes#getCarouselList.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to get the  document matching the _id from Carousel collection
exports.getCarouselByID = function(request,response){
    console.log('Carousel_Routes#getCarouselByID');
    var carouselID = request.params.id;
    carouselDAO.getCarouselByID(carouselID,function(carousel){
        console.dir(carousel);
        response.json(carousel);
    },function(error){
        console.log("Carousel_Routes#getCarouselByID.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to save the document to Carousel collection
exports.saveCarousel = function(request,response){
    console.log('Carousel_Routes#saveCarousel');
    var carouselJSON = request.body;
    console.dir(carouselJSON);
    var newCarouselJSON = {
        title:carouselJSON.title,
        desc:carouselJSON.desc,
        creationDate:new Date(),
        updationDate:new Date(),
        image_path:""
    };
    
    // Copy the Uploaded image to server
    var fullFileTempPath = request.files.file.path;
    console.log("Full Path - " + fullFileTempPath);
    var carouselDbPath = path.join('uploaded_images','carousel',request.files.file.name);
    var copyToPath = path.join(currentDir,'ui','uploaded_images','carousel',request.files.file.name);
    console.log("File will be copied to - " + copyToPath);
    var inFile = fs.createReadStream(fullFileTempPath);
    var outFile = fs.createWriteStream(copyToPath);
    inFile.pipe(outFile);
    newCarouselJSON.image_path = carouselDbPath;
    
    // Save to the Carousel
    carouselDAO.saveCarousel(newCarouselJSON,function(carousel){
        console.log("Carousel_Routes#saveCarousel:");
        console.dir(carousel);
        // Get the list of Carousels
        carouselDAO.getCarouselList(function(carouselList){
            console.log("Carousel_Routes#saveCarousel.The no of carousels retrieved from DB - " + carouselList.length);
            response.json(carouselList);
        },function(error){
            console.log("Carousel_Routes#saveCarousel.Error - " + error);
            response.json([]);
        });

    },function(error){
        console.log("Carousel_Routes#saveCarousel.Error - " + error);
        response.json([]);
    });
};

// REST API end point to delete the document matching the _id from Carousel Collection
exports.deleteCarousel = function(request,response){
    console.log('Carousel_Routes#deleteCarousel');
    var carouselID = request.params.id;
    console.log("Carousel_Routes#deleteCarousel Carousel ID = " + carouselID);
    // Delete
    carouselDAO.deleteCarousel(carouselID,function(){
        // Get the list of Carousels
        carouselDAO.getCarouselList(function(carouselList){
            console.log("Carousel_Routes#deleteCarousel.The no of carousels retrieved from DB - " + carouselList.length);
            response.json(carouselList);
        },function(error){
            console.log("Carousel_Routes#deleteCarousel.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Carousel_Routes#deleteCarousel.Error - " + error);
        response.json([]);
    });
};

// REST API endpoint to update the document matching the _id from the Carousel Collection
exports.updateCarousel = function(request,response){
    console.log('Carousel_Routes#updateCarousel');
    var carouselID = request.params.id;
    console.log('Carousel_Routes#updateCarousel Carousel ID - ' + carouselID);
    var carouselJSON = request.body;
    var newCarouselJSON = {
        title:carouselJSON.title,
        desc:carouselJSON.desc,
        creationDate:carouselJSON.creationDate,
        updationDate:new Date(),
        image_path:carouselJSON.imagePath
    };
    console.dir(newCarouselJSON);
    var isImageUpdated = carouselJSON.isImageUpdated;
    console.log("Carousel_Routes#updateCarousel isImageUpdated - " + isImageUpdated);
    // If the image was also updated, copy the new image into server & delete old image
    if(isImageUpdated === 'true') {
        var existingImagePath = newCarouselJSON.image_path;
        var fullFileTempPath = request.files.file.path;
        console.log("Full Path - " + fullFileTempPath);
        var carouselDbPath = path.join('uploaded_images','carousel',request.files.file.name);
        var copyToPath = path.join(currentDir,'ui','uploaded_images','carousel',request.files.file.name);
        console.log("File will be copied to - " + copyToPath);
        var inFile = fs.createReadStream(fullFileTempPath);
        var outFile = fs.createWriteStream(copyToPath);
        inFile.pipe(outFile);
        // image path
        newCarouselJSON.image_path = carouselDbPath;
        var fileToDelete = path.join(currentDir,'ui',existingImagePath);
        console.log('Carousel_Routes#updateCarousel. Deleting the Image - ' + fileToDelete);
        // Delete Existing Image
        fs.unlink(fileToDelete, function (error) {
            if (error) {
                console.log('Carousel_Routes#updateCarousel.Unable to Delete '  + fileToDelete);
            }else {
                console.log('Carousel_Routes#updateCarousel.Successfully deleted ' + fileToDelete);
            }
        });
    }
    // Update the Carousel Document
    carouselDAO.updateCarousel(carouselID,newCarouselJSON,function(carousel){
        console.log("Carousel_Routes#updateCarousel.Updated Carousel " + carousel);
        // Get the list of Carousels
        carouselDAO.getCarouselList(function(carouselList){
            console.log("Carousel_Routes#updateCarousel.The no of carousels retrieved from DB - " + carouselList.length);
            response.json(carouselList);
        },function(error){
            console.log("Carousel_Routes#updateCarousel.Error - " + error);
            response.json([]);
        });
    },function(error){
        console.log("Carousel_Routes#updateCarousel.Error - " + error);
        response.json([]);
    });
    
};



