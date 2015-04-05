var removecomment = function(id){

  //alert(id);
  $.post('http://localhost:3000/comment/delete/id', {comment_id: id.toString()}, function(data){
    if(data){
      //alert("Done!");
      listcomments();
    }
    else{
      alert("errorg")
    }
  });

};
