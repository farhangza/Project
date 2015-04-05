//String c4movie = "";
var listcomments = function(){

  var user_id = '';
  var name = $('.username').text();

  $.post('http://localhost:3000/account', {name: name}, function(data){
      if(data){

        var user_id = data.toString();
          $.post('http://localhost:3000/comment/list/user', {id: user_id}, function(obj){
            if(obj){
              console.log(obj);
              dynamic_comment(obj);
            }else{
              console.log("getting cooment list failed");
            }
          });

      }else{
        console.log("getting user id failed")
      }
  });

}

var dynamic_comment = function(obj){

  // Remove the existing div elements
  $( ".layoutfour" ).empty();
  $(".layoutthree").empty();

  $('.layoutfour').append("<div class='layoutfive'></div>");
  $('.layoutfive').append("<table class='tablecontainer'></table>");
  $('.tablecontainer').append("<tbody></tbody>");
  $('.tablecontainer tbody').append("<tr><td><b> Comments Created by you </b></td></tr>");
  for(var i=0; i<obj.length; i++){
    //alert(obj[i]);
    //c4movie[i] = obj[i].movie.toString();
    $('.tablecontainer tr:last').after("<tr><td>"+obj[i].text+"***** In the following movie:*****" +  "</td><td><a id='"+obj[i]._id+"'href='#' onclick='removecomment(id)'> Delete </a></td></tr>");
  }

};
