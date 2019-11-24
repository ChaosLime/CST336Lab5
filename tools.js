const request = require('request');
const mysql = require('mysql');

module.exports = { 

    /**
     * Returns random images URLS from an API
     * @param string keyword-search term
     * @param int imageCount - num of images
     * @return array of images of URLs
     */
    getRandomImages_cb: function (keyword, imageCount, callback){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=5991dbc45fea39d95fbd6f48422cc704fb11b861750959a6918de01df02e2174&orientation=landscape";
        request(requestURL,function(error, response, body){
            if(!error){
                var parsedData = JSON.parse(body);
                var imageURL = [];
                for (let i = 0; i < imageCount; i++){
                    imageURL.push(parsedData[i]['urls']['regular']);
                }
                //console.log(imageURL);
                callback(imageURL);
            }else{
                console.log("error: ",error);
            }
        });//request   
    
    },
    
    
    /**
     * Returns random images URLS from an API
     * @param string keyword-search term
     * @param int imageCount - num of images
     * @return array of images of URLs
     */
    getRandomImages: function (keyword, imageCount){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=5991dbc45fea39d95fbd6f48422cc704fb11b861750959a6918de01df02e2174&orientation=landscape";
        
        return new Promise( function(resolve, reject){
             request(requestURL,function(error, response, body){
                if(!error){
                    var parsedData = JSON.parse(body);
                    var imageURL = [];
                    for (let i = 0; i < imageCount; i++){
                        imageURL.push(parsedData[i]['urls']['regular']);
                    }
                    resolve(imageURL);
                    
                }else{
                    console.log("error: ",error);
                }
            });//request   
        });//promise
        },
     /**
      * creates database connection
      * @returns db connection
      */
    createConnection: function(){
         var conn = mysql.createConnection({
        host: 'us-cdbr-iron-east-05.cleardb.net',
        user: 'b19c6379315543',
    password: '202785b7',
    database: 'heroku_8837b232ff441e4'
    });
    return conn;

    }  
        
        
};