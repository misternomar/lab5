// Ramon Lucindo
// CST 336
// Spring, 2019 B
// Module 6 : lab5

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.set("views", "./views/");
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");

//routes


//root route
app.get("/", function(req, res){
    var requestURL = "https://api.unsplash.com/photos/random?client_id=f06eb25d66d0d08314c6c0b6b3300487436f8bf1c5affc079c1247c9198f3adb&orientation=landscape";
    request(requestURL, function (error, response, body) {
      //console.log('error:', error); // Print the error if one occurred
      //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //console.log('body:', body); // Print the API data.
      if (!error) {
          var parsedData = JSON.parse(body);
          //console.log("image url:", parsedData["urls"]["regular"]);
          var imageURL = parsedData["urls"]["regular"];
          res.render("index", {"imageURL":imageURL});
      }
      else {
          res.render("index", {"error":"Unable to access API!"});
      }
      
    });//request
    
});//root route

app.get("/search", function(req, res){
    req.send("hi!");
});

//server listener
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Express Server is Running...");
});