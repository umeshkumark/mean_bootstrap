/* 
 * file - ContactUs_DAO.js 
 * desc - DAO for CRUD operations for ContactUs
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
var contactUsCollection = null;

exports.initContactUsDAO = function(dbConnURI){
    console.log('ContactUs_DAO#initContactUsDAO');
    mongoDBConnURI = dbConnURI;
    contactUsCollection = mongojs.connect(mongoDBConnURI,["ContactUs"]);
};

// function to get the document from the Contact_Us collection
exports.getContactUsDetails = function(successCB,errorCB){
    console.log('ContactUs_DAO#getContactUsDetails');
    contactUsCollection.ContactUs.find(function(error,contactUs){
        if(error) {
            console.log("ContactUs_DAO#getContactUsDetails.Error - " + error);
            errorCB(error);
        }
        else if (!contactUs) {
            console.log("ContactUs_DAO#getContactUsDetails.No Contact Us details exists in DB yet");
            successCB([]);
        }
        else {
            successCB(contactUs);
        }
    });
};

// function to save/update the latitude & longitude of the document in Contact_Us collection
exports.saveMap = function(mapJSON,contactID,successCB,errorCB){        
    console.log('ContactUs_DAO#saveMap');
    contactUsCollection.ContactUs.update({_id:mongojs.ObjectId(contactID)},
     {$set: {latitude:mapJSON.latitude,longitude:mapJSON.longitude,zoom:mapJSON.zoom}},
     {upsert:true},
     function(error,savedDoc){
        if(error){
            console.log("ContactUs_DAO#saveMap.Error - " + error);
            errorCB(error);
        }
        else if (!savedDoc) {
            console.log("ContactUs_DAO#saveMap.Unable to save");
            successCB([]);
        }
        else {
            successCB(savedDoc);
        }
    });
};

// function to save/update the address details of the document in Contact_Us collection
exports.saveAddress = function(addressJSON,contactID,successCB,errorCB){        
    console.log('ContactUs_DAO#saveAddress');
    contactUsCollection.ContactUs.update({_id:mongojs.ObjectId(contactID)},
     {$set: {
             address_line1:addressJSON.address_line1,address_line2:addressJSON.address_line2,address_line3:addressJSON.address_line3,
             phone_no1:addressJSON.phone_no1,phone_no2:addressJSON.phone_no2}},
     {upsert:true},
     function(error,savedDoc){
        if(error){
            console.log("ContactUs_DAO#saveAddress.Error - " + error);
            errorCB(error);
        }
        else if (!savedDoc) {
            console.log("ContactUs_DAO#saveAddress.Unable to save");
            successCB([]);
        }
        else {
            successCB(savedDoc);
        }
    });
};

// function to save/update the social network ids of the document in Contact_Us collection
exports.saveSocialID = function(socialJSON,contactID,successCB,errorCB){        
    console.log('ContactUs_DAO#saveSocialID');
    contactUsCollection.ContactUs.update({_id:mongojs.ObjectId(contactID)},
     {$set: {twitter_id:socialJSON.twitter_id,fb_id:socialJSON.fb_id,gplus_id:socialJSON.gplus_id}},
     {upsert:true},
     function(error,savedDoc){
        if(error){
            console.log("ContactUs_DAO#saveSocialID.Error - " + error);
            errorCB(error);
        }
        else if (!savedDoc) {
            console.log("ContactUs_DAO#saveSocialID.Unable to save");
            successCB([]);
        }
        else {
            successCB(savedDoc);
        }
    });
};