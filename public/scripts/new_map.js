$(document).ready(() => {

  //Setup form sliding
  $('#collaborators-form').hide();
  addCollaboratorsSlider();

  window.collaborators = [];
  $('#add-collaborator-btn').on('click', addCollaboratorHandler);

  $('#new-map-form').on('submit', function(event){
    event.preventDefault();

    //data includes mapinfo, pinInfo, and collaborator info
    let data = $(this).serialize();
    data += getMapCenterEncoded();
    for (pin of window.pinObjs){
      data += `&pinActive=${encodeURIComponent(pin.active)}&pinTitle=${encodeURIComponent(pin.title !== undefined ? pin.title : '')}&pinDescription=${encodeURIComponent(pin.description)}&imageUrl=${encodeURIComponent(pin.imageUrl)}&lat=${encodeURIComponent(pin.getPosition().lat())}&lng=${encodeURIComponent(pin.getPosition().lng())}`
    }
    for (collaborator of window.collaborators){
      if(collaborator[1]){
        data += `&collaborator=${encodeURIComponent(collaborator[0])}`
      }
    }
    saveMap(data);
  });
});

function initMap(){

  window.Pin = makePin();
  const PinMap = makePinMap();
  window.pinObjs = [];

  addMap(PinMap, {lat: 48.4261,  lng: - 123.3642}, pinFormHTML(), false);

  window.map = map;
  map.addListener('click', map.handleMapClick);
}

