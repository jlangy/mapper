function saveMap(data){
  $.ajax({
    url: '/maps' ,
    method: 'POST',
    data,
    complete: function(res){
      window.location.href = `/maps/${res.responseText}`;
    }
  });
}

function updateMap(id, data){
  $.ajax({
    method: 'POST',
    url: `/maps/${id}`,
    data,
    complete: function(res){
      window.location.href = `/maps/${res.responseText}`;
    }
  })
}
