// need to make a get request to maps_json where we query the db to get maps/pins data to pass
// into initMap function to render any map with the saved pins

var map;
var marker;
var infowindow;

const position = { lat: Number(mapData.default_lat), lng: Number(mapData.default_long) };
const pins = [];
for (const pin of pinData) {
  pins.push({location: { lat: Number(pin.lat), lng: Number(pin.long) }, id: pin.id, title: pin.title, description: pin.description, imageUrl: pin.image_url});
}

//build out collaborator list items to append to form. Add delete buttons with click listeners on each
const addCollaborators = (collaboratorData) => {
  collaboratorData.forEach(emailObj => {
    $('#collaborators-list')
      .append($('<div class=collaborator-list-item-container>')
        .append(
          $('<input class="list-group-item" disabled></input>')
            .val(emailObj.email)
        )
        .append($('<button>')
          .addClass('btn btn-danger')
          .on('click', function(){
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
          })
          .text('delete')
      )
    )
  });
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

$(document).ready(() => {
  if(collaboratorData.length === 0){
    $('#collaborators-form').hide();
  } else {
    $('#collaborative-check').prop('checked', true);
  }
  addCollaboratorsSlider();

  addCollaborators(collaboratorData);

  window.collaborators = collaboratorData.map(emailObj => [emailObj.email, true]);
  $('#add-collaborator-btn').on('click', (event) => {
    event.preventDefault();
    const collaborator = $('#collaborators-input').val();
    let exit = false;
    let windowPush = true;
    window.collaborators.forEach((collaboratorArr,i) => {
      if(collaboratorArr[0] === collaborator){
        if(collaboratorArr[1] === true){
          exit = true;
        } else {
          window.collaborators[i][1] = true;
          windowPush = false;
        }
      }
    });
    if(exit) return;
    //function expects objects in an array
    addCollaborators([{email:collaborator}]);
    // $('#collaborators-list').append($('<input class="list-group-item" disabled></input>').val(collaborator));
    if(windowPush) window.collaborators.push([collaborator, true]);
  });

  $('#new-map-form').on('submit', function(event){
    //send form data with pin and collaborator data appended (dynamic entries)
    event.preventDefault();
    let data = $(this).serialize();
    for (pin of window.pins){
      //encodeURIComponent sanitizes data, the pins will come through
      //3 arrays, pinTitle, pinDescription, imageUrl in order
      data += `&pinId=${encodeURIComponent(pin.id)}&pinTitle=${encodeURIComponent(pin.title)}&pinDescription=${encodeURIComponent(pin.description)}&imageUrl=${encodeURIComponent(pin.imageUrl)}&lat=${encodeURIComponent(pin.getPosition().lat())}&lng=${encodeURIComponent(pin.getPosition().lng())}`
    }
    for (collaborator of window.collaborators){
      data += `&email=${encodeURIComponent(collaborator[0])}&active=${collaborator[1]}`
    }
    updateMap(mapId, data);
  });
});

  function initMap() {

    const Pin = makePin();
    const PinMap = makePinMap();

    const pinInfoHTML = ` <form id='infowindow-form'>
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
  </form>
`;

    // The map
    const map_location = position;
    map = new PinMap(document.getElementById("map"), {
      zoom: 12,
      center: map_location
    }, pinInfoHTML);
    window.pins = [];
    // The pins
    for (const pin of pins) {
      marker = new Pin({ position: pin.location, map: map}, pin.title, pin.description, pin.imageUrl, pin.id );
      marker.addListener('click', marker.openForm);
      marker.title = pin.title;
      marker.description = pin.description;
      window.pins.push(marker);
    }
  }

  function pinOpenInfoWindow(){
    let pin = this;
    const infowindow = this.map.infowindow;
    infowindow.open(this.map, this);
    //remove old domready listener if present
    if(this.map.infoWindowReady) this.map.infoWindowReady.remove();
    this.map.infoWindowReady = infowindow.addListener('domready', pin.setInfowindowFieldsBound);
  }
