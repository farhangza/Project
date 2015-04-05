// Add comment to a movie
var comment = function(){
     var scope = '';
     var text = $('.textarea_text').val();
     if($("input[name=scope]:checked").val() == undefined){
       var scope = false;
     }else{
       var scope = true;
     }
     var movie_id =movie_data.id;
     var name = $('.username').text();
     var user_id = '';

     $.post('http://localhost:3000/account', {name: name}, function(data){
        if(data){
          var user_id = data;
          $.post('http://localhost:3000/movie/comment', {movie_id: movie_id, user_id: user_id.toString(), text: text, visible: scope}, function(data){
          });
          search();
        }
      });


}
