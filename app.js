const express = require("express");
const app = express();

app.set('view engine','ejs');
app.set("views", "./views/");
app.use(express.static("public"));


const request = require("request");
const tools = require("./tools.js");


const mysql = require('mysql');



app.get("/api/updateFavorites", function(req, res){
    
    var conn = tools.createConnection();
    
    var sql;
    var sqlParams;

    if(req.query.action =="add"){
         sql = "INSERT INTO favorite (imageURL, keyword) VALUES (?,?)";
         sqlParams = [req.query.imageURL, req.query.keyword ]; 
    }else{
        sql = "DELETE FROM favorite WHERE imageURL = ?";
        sqlParams = [req.query.imageURL]; 
    }

    
    conn.connect( function(err){
        
        if (err) throw err;
        
        conn.query(sql,sqlParams, function(err, result){
            if (err) throw err;

        });//query
    console.log('Connected!');
    });//connect
    res.send("it works!");
    
});//updateFavorites


//routes

//root route
app.get("/", async function(req, res){
    var imageURLs = await tools.getRandomImages("",1);
    console.log("imageURLs from Promise: " + imageURLs);
    res.render("partials/index.ejs",{"imageURL":imageURLs}); 
});// root route

app.get("/search", async function(req,res){

    var keyword = req.query.keyword;
    var imageCount = 9;
    
    var imageURLs = await tools.getRandomImages(keyword,imageCount);
    console.log("imageURLs from Promise: " + imageURLs);
    res.render("partials/results.ejs",{"imageURLs":imageURLs, "keyword":keyword}); 

    // getRandomImages_cb( keyword,imageCount, function(imageURLs){
    //      res.render("partials/results",{"imageURLs":imageURLs}); 
    //  });

   
});//search

app.get("/displayKeywords", async function(req, res){
    var imageURL = await tools.getRandomImages("",1);
    var conn = tools.createConnection();
    var sql = "SELECT DISTINCT keyword FROM `favorite` ORDER BY keyword;";
    
    conn.connect( function(err){
       if (err) throw err;
        conn.query(sql, function(err, result){
            if (err) throw err;
            res.render("partials/favorites.ejs",{"rows":result, "imageURLs":imageURL});
            console.log(result);
        });
      
    });
    
});//display keywords


app.get("/api/displayFavorites",function(req,res){
    var conn = tools.createConnection();
    var sql = "SELECT imageURL FROM favorite WHERE keyword = ?";
    var sqlParams = [req.query.keyword];
    
    conn.connect( function(err){
      if (err) throw err;
        conn.query(sql,sqlParams, function(err, results){
            if (err) throw err;
            res.send(results);
        });  
    }); 
});//diplay Favorties


//server listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running Express Server...");
});