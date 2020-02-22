const pinDisplayHTML = () => {
  return `<div id="content">
  <img id="infowindow-imageUrl">
  <h5 id="infowindow-title" class="pinHeading"></h5>
  <div id="infowindow-description">
  <p></p>
  </div>
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
  const emailElement = $(this).parent().siblings('input');
  const deletedEmail = emailElement.val();
  emailElement.val('');
  window.collaborators = window.collaborators.map(collaborator => {
    if(collaborator[0] === deletedEmail){
      return [collaborator[0], false];
    }
    return collaborator;
  });
  // window.collaborators = window.collaborators.filter(email => email != deletedEmail);
  $(this).parent().parent().remove();
  // $(this).remove();
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

const latLongDistance = (lat1, lat2, lon1, lon2) => {
  const R = 6371e3; // metres
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2-lat1);
  const Δλ = toRadians(lon2-lon1);

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c;
  return Math.round(d);
}

const toRadians = deg => deg * Math.PI / 180;


const addCollaboratorsSlider = () => {
  $('#collaborative-check').on('click', function(){
    $('#collaborators-form').slideToggle();
    if($(this).prop('checked') === false){
      $('#collaborators-list').empty();
      window.collaborators = window.collaborators.map(collaborator => [collaborator[0], false]);
    }
  });
}

const addPinsHover = () => {
  $('.pins-display').mouseenter(function(event){
    event.preventDefault();
    const pinId = $(event.target).attr('data-pin-id');
    //pin.id undefined for newly created pins
    const hoverPin = window.pinObjs.filter(pin => (pin.id || pin.tempId) == pinId)[0];
    hoverPin.displayInfo();
  }, );
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

const updatePinsDisplays = pin => {
  //Imported pins have an in. New pins have tempId will have id
  console.log(pin.displayed)
  if(pin.displayed){
    updatePinDisplay({id: pin.id || pin.tempId, description:pin.description, title:pin.title, imageUrl: pin.imageUrl});
  } else {
    makePinDisplay({id: pin.id || pin.tempId, description:pin.description, title:pin.title, imageUrl: pin.imageUrl})
    pin.displayed = true;
  }
}

const updatePinDisplay = pin => {
  pinDisplay = $(`.pins-display[data-pin-id="${String(pin.id)}"]`)
  pinDisplay.find('h5').text(pin.title);
  pinDisplay.find('p').text(pin.description);
  pinDisplay.find('.pin-image').attr('src', pin.imageUrl);
}

const makePinDisplay = pin => {
  console.log('ran')
  $('.pins').append(
    $('<div>').addClass("pins-display")
      .attr("data-pin-id", pin.id)
      .append(
        $("<div>").append($("<h5>").text(pin.title))
          .append($('<p>').text(pin.description))
      ).append(
        $('<div>')
          .append(
            $('<image>').addClass('pin-image')
              .attr('src', pin.imageUrl)
          )
      )
  )
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
        <input type="text" class="form-control" id="infowindow-imageUrl" style='height: unset; width: 100%' name='imageUrl' placeholder="https://www">
      </div>
      <div id='save-pin' class='btn btn-primary'>Save</div>
      <div id='delete-pin' class='btn btn-danger'>Delete</div>
    </form>
  `
}

const addCollaborators = (collaboratorData) => {
  collaboratorData.forEach(emailObj => {
    $('#collaborators-list')
      .append($('<div class="collaborator-list-item-container input-group">')
        .append(
          $('<input class="list-group-item" disabled></input>')
            .val(emailObj.email)
        )
        .append($('<div class="input-group-append">')
          .append($('<div>')
            .addClass('btn btn-danger')
            .on('click', deleteCollaboratorHandler)
            .text('delete')
          )
      )
    )
  });
}
