const request = require('request');
const mysql = require('mysql');
module.exports = {
/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of image URLs
 **/
getRandomImages_cb: function (keyword, imageCount, callback) {
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=f06eb25d66d0d08314c6c0b6b3300487436f8bf1c5affc079c1247c9198f3adb&orientation=landscape";
    request(requestURL, function (error, response, body) {
      if (!error) {
          var parsedData = JSON.parse(body);
          //console.log("image url:", parsedData["urls"]["regular"]);
          var imageURLs = []; 
          for (let i=0; i < 9; i++){
            imageURLs.push(parsedData[i].urls.regular);
          }
          //console.log(imageURLs);
          
          //return imageURLs
          callback(imageURLs);
      }
      else {
          console.log("error", error);
      }
    });//request
},
/**
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of image URLs
 **/
getRandomImages: function (keyword, imageCount) {
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=f06eb25d66d0d08314c6c0b6b3300487436f8bf1c5affc079c1247c9198f3adb&orientation=landscape";
    
    return new Promise( function(resolve, reject){
        request(requestURL, function (error, response, body) {
          if (!error) {
              var parsedData = JSON.parse(body);
              //console.log("image url:", parsedData["urls"]["regular"]);
              var imageURLs = []; 
              for (let i=0; i < imageCount; i++){
                imageURLs.push(parsedData[i].urls.regular);
              }
              //console.log(imageURLs);
              
              //return imageURLs
              resolve(imageURLs);
          }
          else {
              console.log("error", error);
          }
        });//request
    });//promise
}, //function

/**
 * creates database connection
 * @return db connection
 */
createConnection: function(){
    var conn = mysql.createConnection({
        host: "cst336db.space",
        user: "cst336_dbUser002",
        password: "shl2ed",
        database: "cst336_db002"
    });
    return conn;
}
};