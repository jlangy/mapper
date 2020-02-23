//dbData coming from ejs
const mapData = dbData['mapData'];
const pinData = dbData['pinData'];
const collaboratorData = dbData['collaboratorData'];

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
    $('#collaborative-check').prop('checked', false);
  } else {
    $('#collaborative-check').prop('checked', true);
  }
  addCollaboratorsSlider();
  addCollaborators(collaboratorData);

  fillMapForm();
  addPinsHover($('.pins-display'));

  window.collaborators = collaboratorData.map(emailObj => [emailObj.email, true]);
  $('#add-collaborator-btn').on('click', addCollaboratorHandler);

  $('#new-map-form').on('submit', function(event){
    event.preventDefault();
    let data = $(this).serialize();

    //Add pindata, maps center, and collaborator data for update
    data += getMapCenterEncoded();
    const updatedPins = window.pinObjs.filter(pin => pin.updated);
    for (pin of updatedPins){
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

  const mapPosition = { lat: Number(mapData.default_lat), lng: Number(mapData.default_long) };
  //Check for a default lat, if supplied position was given. Else use users position
  const positionGiven = mapData.default_lat;

  window.map = addMap(PinMap, mapPosition, pinFormHTML(), positionGiven);

  window.pinObjs = pinData.map(pin => {
    const position = { lat: Number(pin.lat), lng: Number(pin.long) }
    marker = new Pin({ position, map: window.map}, pin.title, pin.description, pin.imageUrl, pin.id);
    marker.addListener('click', marker.openForm);
    marker.displayed = true;
    return marker;
  })
  map.addListener('click', map.handleMapClick)
}
