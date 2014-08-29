/* 
 * file - Utility.js 
 * desc - Utility file used on node side
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

var crypto = require('crypto');

exports.generateHash = function(plainText){
    console.log('Utility#generateHash.Plain Text - ' + plainText);
    var md5sum = crypto.createHash('md5');
    md5sum.update(plainText);
    var hash = md5sum.digest('hex');
    console.log('Utility#generateHash.Hash - ' + hash);
    return hash;
};

