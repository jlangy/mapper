// need to make a get request to maps_json where we query the db to get maps/pins data to pass
// into initMap function to render any map with the saved pins

var map;
var marker;
var infowindow;

const position = { lat: Number(mapData.default_lat), lng: Number(mapData.default_long) };
const pins = [];
for (const pin of pinData) {
  if(pin.active){
    pins.push({location: { lat: Number(pin.lat), lng: Number(pin.long) }, title: pin.title, description: pin.description, imageUrl: pin.image_url});
  }
}

function initMap() {

  const Pin = makePin();
  const PinMap = makePinMap();

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
  }
}

