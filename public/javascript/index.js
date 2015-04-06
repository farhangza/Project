var SendId = function(){
   //alert("calling func");
  var name = $('.username').text();
  $.post('http://localhost:3000/account', {name: name}, function(data){
  if(data){user_ID = data.toString();}
   });
}

var user_ID = "";
var movie_data = {};
var search = function () {
  // Remove the existing div elements
  $(".layoutfour" ).empty();
  $(".layoutthree").empty();
  // Search for the movie
    var value = $('#searchvalue').val();
    $.post('http://localhost:3000/movie', {title: value}, function(data){
        if(data){
          console.log("List of comments"+data[0][0].length);
          // add the movie data to an array
          movie_data.id = data[0][0]._id;
          movie_data.title = data[0][0].title;
          movie_data.year = data[0][0].year;
          movie_data.info= data[0][0].info;
          $('.layoutfour').append("<div class='layoutfive'></div>");
          $('.layoutfive').append("<table class='tablecontainer'></table>");
          $('.tablecontainer').append("<tbody></tbody>");
          $('.tablecontainer tbody').append("<tr><td><b>Title:</b>"+data[0][0].title+"</td><td> <b>year:</b>"+data[0][0].year+"</td></tr>");
          $('.layoutthree').prepend('<img id="theImg" src="'+data[0][0].picture+'" />');
          $('.layoutthree').append('<p class="details"><b>Description</b>"'+data[0][0].info+'"</p>');
          if(data[1].length == 0){
            $('.tablecontainer tr:last').after("<tr><td><textarea class='textarea_text'></textarea></td></tr>");
            $('.tablecontainer tr:last').after("<tr><td><input type='checkbox' name='scope' value='private'>Private</td></tr>");
            $('.tablecontainer tr:last').after("<tr><td><button id='add' type='submit' onclick='add()'> Add to my list</button><button id='comment' type='submit' onclick='comment()'> Comment </button></td></tr>");
          }

          for(var i=0;i<data[1].length;i++){
            //console.log(SendId(data[1][i+1].user_id));
            SendId(data[1][i].user_id);
            //putting Id to user_ID throw SendId function

            //alert($.post(data[1][i].user_id));
              if(data[1][i].visible == true && data[1][i].user_id.toString() == user_ID || data[1][i].visible == false){
                $('.tablecontainer tr:last').after("<tr><td>"+ data[1][i].user_id+ "  "+ "   Says:    "+data[1][i].text+"</td></tr>");
              }
              //$('.tablecontainer tr:last').after("<tr><td>" + data[1][i].text+"</td></tr>");
            //alert("if is fine");
              //alert("out of if");
              //
              //
              //   }
               if(i == data[1].length-1){
                $('.tablecontainer tr:last').after("<tr><td><textarea class='textarea_text'></textarea></td></tr>");
                $('.tablecontainer tr:last').after("<tr><td><input type='checkbox' name='scope' value='private'>Private</td></tr>");
                $('.tablecontainer tr:last').after("<tr><td><button id='add' type='submit' onclick='add()'> Add to my list</button><button id='comment' type='submit' onclick='comment()'> Comment </button></td></tr>");
              }
         }
        }else{
          alert("Not success");
        }
    });
  }
  // ////////////////////////****************************
  // var getId = function(){
  //   alert(calling func);
  //   var name = $('.username').text();
  //   $.post('http://localhost:3000/account', {name: name}, function(data){
  //     if(data){user_ID = data.toString();}
  //   });
  // }
  ///////////////////////***********************************
