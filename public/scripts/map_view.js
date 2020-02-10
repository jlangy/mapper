// need to make a get request to maps_json where we query the db to get maps/pins data to pass
// into initMap function to render any mapp with the saved pins

var map;
var marker;

var position = { lat: 48.4261, lng: -123.3642 };
var pins = [
  { lat: 48.4278, lng: -123.369 },
  { lat: 48.4262, lng: -123.3616 }
];

function initMap() {
  // The map
  const map_location = position;
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: map_location
  });

  // The pins
  for (const pin of pins) {
    let marker = new google.maps.Marker({
      position: pin,
      map: map
    });
  }
}
