var deletelist = function(id){

  var movie_id = id;
  var list_id = "552017da8babf7601247ec32"

  $.post('http://localhost:3000/Favourites/delete/id', {id: list_id, movie_id: movie_id}, function(data){
    if(data){
      favourite_movies = [];
      //alert("success");
    }else{
      alert("failed")
    }

  });

};
