

var add = function(){

  var user_id = '';
  var movie_id =movie_data.id;
  var name = $('.username').text();

  // get the user id
  $.post('http://localhost:3000/account', {name: name}, function(data){
     if(data){
       var user_id  = data;
       $.post('http://localhost:3000/list/id', {id: user_id.toString()}, function(data){

         if(data.message == "error"){
           console.log("error");
         }else if(data.message == null ){
           alert(data.message);
           // when the list is empty
           $.post('http://localhost:3000/Favourites/add', {id: user_id.toString(), movie_id: movie_id}, function(data){
             if(data){
               alert("success");
             }else{
               alert("fail");
             }
           });
           console.log("Empty list");
         }else{
           var list_data = {};
           list_data.list_id = data.message._id;
           list_data.user_id = data.message.user_id;
           list_data.list = data.message.list;

           $.post('http://localhost:3000/Favourites/add/id', {id: list_data.list_id.toString(), movie_id: movie_id}, function(data){
           });
         }

       });

     }else{
       console.log("user_id post request failed");
     }
   });

}
