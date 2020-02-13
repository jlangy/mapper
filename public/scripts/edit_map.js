// need to make a get request to maps_json where we query the db to get maps/pins data to pass
// into initMap function to render any map with the saved pins

var map;
var marker;
var infowindow;

const position = { lat: Number(mapData.default_lat), lng: Number(mapData.default_long) };
const pins = [];
for (const pin of pinData) {
  if(pin.active){
    pins.push({location: { lat: Number(pin.lat), lng: Number(pin.long) }, id: pin.id, title: pin.title, description: pin.description, imageUrl: pin.image_url});
  }
}

const fillMapForm= () => {
  $('#map-form-title').val(mapData.title);
  $('#map-form-description').val(mapData.description);
  if(mapData.public){
    $('#public-check').prop('checked', true);
  }
}

$(document).ready(() => {
  //setup collaborator form slider
  if(collaboratorData.length === 0){
    $('#collaborators-form').hide();
  } else {
    $('#collaborative-check').prop('checked', true);
  }
  addCollaboratorsSlider();
  addCollaborators(collaboratorData);

  fillMapForm();

  window.collaborators = collaboratorData.map(emailObj => [emailObj.email, true]);
  $('#add-collaborator-btn').on('click', addCollaboratorHandler);

  $('#new-map-form').on('submit', function(event){
    //send form data with pin and collaborator data appended (dynamic entries)
    event.preventDefault();
    let data = $(this).serialize();
    data += getMapCenterEncoded();
    for (pin of window.pins){
      //encodeURIComponent sanitizes data, the pins will come through
      //3 arrays, pinTitle, pinDescription, imageUrl in order
      data += `&pinActive=${encodeURIComponent(pin.active)}&pinId=${encodeURIComponent(pin.id)}&pinTitle=${encodeURIComponent(pin.title)}&pinDescription=${encodeURIComponent(pin.description)}&imageUrl=${encodeURIComponent(pin.imageUrl)}&lat=${encodeURIComponent(pin.getPosition().lat())}&lng=${encodeURIComponent(pin.getPosition().lng())}`
    }
    for (collaborator of window.collaborators){
      data += `&email=${encodeURIComponent(collaborator[0])}&active=${collaborator[1]}`
    }
    updateMap(mapId, data);
  });
});

function initMap() {

  window.Pin = makePin();
  const PinMap = makePinMap();

  // The map
  const map_location = position;

  window.map = addMap(PinMap, position, pinFormHTML(), mapData.default_lat);

  // The pins
  window.pins = [];
  for (const pin of pins) {
    marker = new Pin({ position: pin.location, map: map}, pin.title, pin.description, pin.imageUrl, pin.id);
    marker.addListener('click', marker.openForm);
    marker.title = pin.title;
    marker.description = pin.description;
    window.pins.push(marker);
  }
  map.addListener('click', map.handleMapClick)
}
