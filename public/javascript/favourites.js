// Global objects
var movie_ids = [];
var favourite_movies = [];
var Favourites = function(){
//
    $.post('http://localhost:3000/Favourites', {user_id: "5519e823d43ce7a00546f8ae"}, function(data){
        if(data){
          for(var i=0; i<data.length; i++){
            movie_ids.push(data[i].movie_id);
            console.log(data[i].movie_id);
          }
        }else{
          console.log("comment post failed")
        }
        for(var i=0;i<movie_ids.length;i++){
          // Get movie data for each of the movies
          $.post('http://localhost:3000/movie/id', {movie_id: movie_ids[i]}, function(data){
            if(data){
              favourite_movies.push(data);
              console.log("fav movies success");
            }else{
              console.log("fav movies not sussess")
            }
            console.log(favourite_movies);
          });
        }
        console.log("list of movies in favourities" +movie_ids.length);
    });
    // list all the favourite movies ( Online DB is slow so we gave it 1500 ms delay)
    setTimeout(function() {
      dynamic_html();
    }, 1500);

}

var dynamic_html = function(){
  // Remove the existing div elements
  $( ".layoutfour" ).empty();
  $(".layoutthree").empty();
  // New movies --> layoutfourfive
  $('.layoutfour').append("<div class='layoutfive'></div>");
  $('.layoutfive').append("<table class='tablecontainer'></table>");
  $('.tablecontainer').append("<tbody></tbody>");
  $('.tablecontainer tbody').append("<tr><td><b>Title</b></td><td> <b>year</b></td></tr>");
  for(var i=0; i<favourite_movies.length; i++){ console.log(favourite_movies[i]);
    $('.tablecontainer tr:last').after("<tr><td>"+favourite_movies[i].title+"</td><td>"+favourite_movies[i].year+"</td><td><button id='"+favourite_movies[i]._id+"' type='submit' onclick='deletelist(id)'> Remove</button></td></tr>");
  }
}

;
