$(document).ready(function(){
    
    $(document).on("click", ".favoriteIcon", function() {
        var imageURL = $(this).prev().attr("src");
      if ($(this).attr("src") == "img/favorite.png") {
        $(this).attr("src", "img/favorite_on.png");
        updateFavorite("add", imageURL);//inserts a new record
      }
      else {
        $(this).attr("src", "img/favorite.png");
        updateFavorite("delete", imageURL);//delete a record
      }
    });
    
    $(".keywordLink").on("click", function() {
        
        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: {
                    "keyword": $(this).text().trim(),
                },
            success: function(rows, status) {
                    $("#favorites").html("");
                    rows.forEach(function(row, i){
                        $("#favorites").append(
                        "<img class='image' src='" + row.imageURL + 
                        "' width='200' height='200'>");
                        $("#favorites").append("<img class='favoriteIcon' src='img/favorite_on.png'" +
                        "width='20'>");
                        if (i % 4 == 0 && i > 1) {
                            $("#favorites").append("<br>");
                        }
                    });
            }
        });//ajax
    });

    function updateFavorite(action, imageURL) {
        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {"imageURL": imageURL,
                    "keyword": $("#keyword").val(),
                    "action": action
            }
        });//ajax
    }
});