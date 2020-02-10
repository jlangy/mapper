function saveMap(data){
  $.ajax({
    url: '/maps' ,
    method: 'POST',
    data
  });
}
