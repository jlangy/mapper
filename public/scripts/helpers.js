const pinDisplayHTML = () => {
  return `<div id="content">
  <h5 id="infowindow-title" class="pinHeading"></h5>
  <div id="infowindow-description">
  <p></p>
  </div>
  <img id="infowindow-imageUrl">
  </div>
  `
}

const addCollaboratorHandler = (event) => {
  event.preventDefault();
  const collaboratorEmail = $('#collaborators-input').val();

  //collaborators in form [email, bool]
  for (const collaborator of window.collaborators){
    //Do nothing if collaborator already present and active
    if(collaborator[0] === collaboratorEmail){
      if(collaborator[1]){
        return;
      } else {
        //Else set true, add to page and return
        collaborator[1] = true;
        return addCollaborators([{email:collaboratorEmail}]);
      }
    }
  }
  //if not in page, add to page and list
  addCollaborators([{email:collaboratorEmail}]);
  window.collaborators.push([collaboratorEmail, true]);
}

const deleteCollaboratorHandler = function(){
  const deletedEmail = $(this).siblings('input').val();
  window.collaborators = window.collaborators.map(collaborator => {
    if(collaborator[0] === deletedEmail){
      return [collaborator[0], false];
    }
    return collaborator;
  });
  // window.collaborators = window.collaborators.filter(email => email != deletedEmail);
  $(this).siblings('input').remove();
  $(this).remove();
}

const addMap = (PinMap, map_location, infoWindowHTML, positionGiven) => {
  map = new PinMap(document.getElementById("map"), {
    zoom: 12,
    center: map_location
  }, infoWindowHTML);

  //set map centre to user location if a default position was given
  if (navigator.geolocation && !positionGiven) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  }

  function handleLocationError(browserHasGeolocation, pos) {
    console.log('not fond');
  }
  return map;
}

const addCollaboratorsSlider = () => {
  $('#collaborative-check').on('click', function(){
    $('#collaborators-form').slideToggle();
    if($(this).prop('checked') === false){
      $('#collaborators-list').empty();
      window.collaborators = window.collaborators.map(collaborator => [collaborator[0], false]);
    }
  });
}

const getMapCenterEncoded = function(){
  if($('#maps-center-option').prop('checked') === true){
    const pos = window.map.getCenter();
    console.log(pos)
    return `&mapLat=${encodeURIComponent(pos.lat())}&mapLng=${encodeURIComponent(pos.lng())}`
  } else {
    return `&mapLat=&mapLng=`
  }
}

const pinFormHTML = () => {
  return ` <form id='infowindow-form'>
      <div class="form-group">
        <label for="infowindow-title">Title</label>
        <input type="text" class="form-control" id="infowindow-title" name='title' placeholder="Title">
      </div>
      <div class="form-group">
        <label for="infowindow-description">Description</label>
        <textarea type="text" class="form-control" id="infowindow-description" name='description'></textarea>
      </div>
      <div class="form-group">
        <label for="infowindow-imageUrl">Image URL</label>
        <input type="text" class="form-control" id="infowindow-imageUrl" name='imageUrl' placeholder="https://www">
      </div>
      <button id='delete-pin' class='btn btn-danger'>Delete</button>
    </form>
  `
}

const addCollaborators = (collaboratorData) => {
  collaboratorData.forEach(emailObj => {
    $('#collaborators-list')
      .append($('<div class=collaborator-list-item-container>')
        .append(
          $('<input class="list-group-item" disabled></input>')
            .val(emailObj.email)
        )
        .append($('<div>')
          .addClass('btn btn-danger')
          .on('click', deleteCollaboratorHandler)
          .text('delete')
      )
    )
  });
}
