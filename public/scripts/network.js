function saveMap(data){
  $.ajax({
    url: '/maps' ,
    method: 'POST',
    data
  });
}

function updateMap(id, data){
  $.ajax({
    method: 'POST',
    url: `/maps/${id}`,
    data
  })
}
