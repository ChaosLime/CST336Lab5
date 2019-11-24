$(document).ready(function(){
    
    $(".favoriteIcon").on("click", function(){
        //alert($(this).prev().attr("src"));

        var imageURL = $(this).prev().attr("src");
        
        if($(this).attr("src")== "img/favorite.png"){
            $(this).attr("src","img/favorite_on.png");
            updateFavorite("add",imageURL); //inserts a new record
        }else{
            $(this).attr("src","img/favorite.png");
            updateFavorite("delete",imageURL); //deletes record
        }

        
        
    });
    
    $(".keywordLink").on("click",function(){
        //alert($(this).text().trim());
        $.ajax({
            method: "GET",
               url: "/api/displayFavorites",
              data: {
                  "keyword" : $(this).text().trim(),
                    },
           success: function(rows, status)
           {
            $("#favorites").html("");
               rows.forEach(function(row, i)
               {
                   $("#favorites").append("<img class='image' src='" + row.imageURL+"' width='200' height='200'>");
                   $(".favoriteIcon").append("<img class='favoriteIcon' src='img/favorite_on.png' width='20'>");
                    if(i%4 == 3) {
                        $("#favorites").append("<br>");
                    }
               });
               $(".favoriteIcon").on("click", function() {
         
               var imageURL = $(this).prev().attr("src");
         
               if($(this).attr("src", "img/favorite_on.png")){
                    $(this).attr("src", "img/favorite.png");
                    updateFavorite("delete", imageURL); //removes record from database
               }else{
                    $(this).attr("src", "img/favorite_on.png");
                    updateFavorite("add", imageURL); //removes record from database

               }
               
            });
            }
           
        });//ajax
    });
    
    function updateFavorite(action,imageURL){
        $.ajax({
            method: "GET",
               url: "api/updateFavorites",
              data: {"imageURL" : imageURL,
                      "keyword" : $("#keyword").val(),
                        "action": action
                    }
        });//ajax
    }
    
    
});
    
