var map;
var marker;
var infowindow;
const mapId = mapData.id;

const position = { lat: Number(mapData.default_lat), lng: Number(mapData.default_long) };
const pins = [];
for (const pin of pinData) {
  if(pin.active){
    pins.push({location: { lat: Number(pin.lat), lng: Number(pin.long) }, title: pin.title, description: pin.description, imageUrl: pin.image_url, id: pin.id});
  }
}

function initMap() {

  const Pin = makePin();
  const PinMap = makePinMap();
  window.pinObjs = [];
  // The map
  addMap(PinMap, position, pinDisplayHTML(), mapData.default_lat);
  window.map = map;

  // The pins
  for (const pin of pins) {
    marker = new Pin({ position: pin.location, map: map}, pin.title, pin.description, pin.imageUrl);
    marker.addListener('click', marker.pinOpenInfoWindowBound);
    marker.title = pin.title;
    marker.description = pin.description;
    marker.imageUrl = pin.imageUrl;
    marker.id = pin.id;
    window.pinObjs.push(marker);
  }
}

// when heart is clicked for map set as favourite or remove from favourites
$(document).ready(() => {
  $('.favourite').click(function() {
    $(this).toggleClass('like')
    $.ajax({
      url: '/maps/favourites',
      type: 'POST',
      data: {mapId, fav}
    })
  });

  $('.pins-display').mouseenter(function(event){
    event.preventDefault();
    const pinId = $(event.target).attr('data-pin-id');
    const hoverPin = window.pinObjs.filter(pin => pin.id == pinId)[0];
    hoverPin.displayInfo();
  }, );
})
