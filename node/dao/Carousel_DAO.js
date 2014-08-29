/* 
 * file - Carousel_DAO.js 
 * desc - DAO for CRUD operations for Carousel
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
// connection string for 'Carousel' collection
var carouselCollection = null;

exports.initCarouselDAO = function(dbConnURI){
    console.log('Carousel_DAO#initCarouselDAO');
    mongoDBConnURI = dbConnURI;
    carouselCollection = mongojs.connect(mongoDBConnURI,["Carousel"]);
};

// function to get the list of all documents in Carousel collection
exports.getCarouselList = function(successCB,errorCB){
    console.log('Carousel_DAO#getCarouselList');
    carouselCollection.Carousel.find(function(error,carouselList){
        if(error) {
            console.log("Carousel_DAO#getCarouselList.Error - " + error);
            errorCB(error);
        }
        else if (!carouselList) {
            console.log("Carousel_DAO#getCarouselList.No Carousels exists in DB");
            successCB([]);
        }
        else {
            successCB(carouselList);
        }
    });
};

// function to get the document matching the _id in Carousel collection
exports.getCarouselByID = function(carouselID,successCB,errorCB){
    console.log('Carousel_DAO#getCarouselByID Carousel ID - ' + carouselID);
    carouselCollection.Carousel.find({_id:mongojs.ObjectId(carouselID)},function(error,carousel){
        if(error) {
            console.log("Carousel_DAO#getCarouselByID.Error - " + error);
            errorCB(error);
        }
        else if (!carousel) {
            console.log("Carousel_DAO#getCarouselByID.No Carousel exists in DB");
            successCB([]);
        }
        else {
            successCB(carousel);
        }
    });
};

// function to save the document to the Carousel collection
exports.saveCarousel = function(carouselJSON,successCB,errorCB){
    console.log('Carousel_DAO#saveCarousel');
    console.dir(carouselJSON);
    // Save the JSON
    carouselCollection.Carousel.save(carouselJSON,function(error,savedDoc){
        if(error){
            console.log("Carousel_DAO#saveCarousel.Error - " + error);
            errorCB(error);
        }
        else if (!savedDoc) {
            console.log("Carousel_DAO#saveCarousel.Unable to save");
            successCB([]);
        }
        else {
            successCB(savedDoc);
        }
    });
};

// function to delete the document matching the _id in Carousel collection
exports.deleteCarousel = function(carouselID,successCB,errorCB){
    console.log('Carousel_DAO#deleteCarousel Carousel ID - ' + carouselID);
     carouselCollection.Carousel.remove({_id:mongojs.ObjectId(carouselID)},function(error){
        if(error){
            console.log("Carousel_DAO#deleteCarousel.Error - " + error);
            errorCB(error);
        }
        else {
            successCB();
        }
    });
};

// function to update the document matching the _id in Carousel collection
exports.updateCarousel = function(carouselID,carouselJSON,successCB,errorCB){
    console.log('Carousel_DAO#updateCarousel Carousel ID - ' + carouselID);
    console.dir(carouselJSON);
    carouselCollection.Carousel.update({_id:mongojs.ObjectId(carouselID)},carouselJSON,function(error,updatedDoc){
        if(error){
            console.log("Carousel_DAO#updateCarousel.Error - " + error);
            errorCB(error);
        }
        else if (!updatedDoc) {
            console.log("Carousel_DAO#updateCarousel.Unable to update");
            successCB([]);
        }
        else {
            successCB(updatedDoc);
        }
     });
};

