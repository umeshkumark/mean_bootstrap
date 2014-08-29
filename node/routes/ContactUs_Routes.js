/* 
 * file - ContactUs_Routes.js 
 * desc - Rest API calls for all routes meant for ContactUs
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

var mongoDBConnURI = "";
var currentDir = "";
var contactUsDAO = null;
var path = require('path');
var fs = require('fs');

exports.initContactUs = function(curDir,dbConnURI){
    console.log('ContactUs_Routes curDir - ' + curDir + ' dbConnURI - ' + dbConnURI);
    mongoDBConnURI = dbConnURI;
    currentDir = curDir;
    // Initialize DAO
    var contactUsDAOPath = path.join(currentDir,'node','dao','ContactUs_DAO.js');
    console.log('ContactUs_Routes#ContactUs_DAO path - ' + contactUsDAOPath);
    contactUsDAO = require(contactUsDAOPath);
    contactUsDAO.initContactUsDAO(dbConnURI);
};

// function to get the document from the Contact_Us collection
exports.getContactUsDetails = function(request,response){
    console.log('ContactUs_Routes#getContactUsDetails');
    contactUsDAO.getContactUsDetails(function(contactDetails){
        console.log("ContactUs_Routes#getContactUsDetails - " + contactDetails.length);
        response.json(contactDetails);
    },function(error){
        console.log("Home_Routes#getCarouselList.Error - " + error);
        response.json({});
    });
};

// function to save/update the document in the Contact_Us collection
exports.saveContactUsDetails = function(request,response){
    console.log('ContactUs_Routes#saveContactUsDetails');
    var type = request.params.type;
    var contactID = request.params.contactID;
    var json = request.body;
    console.dir(json);
    console.log('ContactUs_Routes#saveContactUsDetails.Type - ' + type + ' Contact ID - ' + contactID);
    if(type=='map'){
        var mapJSON = {
            latitude:json.latitude,
            longitude:json.longitude,
            zoom:json.zoom
        };
        contactUsDAO.saveMap(mapJSON,contactID,function(mapDetails){
        console.dir(mapDetails);
        response.json(mapDetails);
        },function(error){
            console.log("Carousel_Routes#saveContactUsDetails.Error - " + error);
            response.json({});
        });
    }
    else if(type=='address'){
        var addressJSON = {
            address_line1:json.address_line1,
            address_line2:json.address_line2,
            address_line3:json.address_line3,
            phone_no1:json.phone_no1,
            phone_no2:json.phone_no2
        };
        contactUsDAO.saveAddress(addressJSON,contactID,function(addressDetails){
        console.dir(addressDetails);
        response.json(addressDetails);
        },function(error){
            console.log("Carousel_Routes#saveContactUsDetails.Error - " + error);
            response.json({});
        });
    }
    else if(type=='social'){
        var socialJSON = {
            twitter_id:json.twitter_id,
            fb_id:json.fb_id,
            gplus_id:json.gplus_id
        };
        contactUsDAO.saveSocialID(socialJSON,contactID,function(socialDetails){
        console.dir(socialDetails);
        response.json(socialDetails);
        },function(error){
            console.log("Carousel_Routes#saveContactUsDetails.Error - " + error);
            response.json({});
        });
    }
};