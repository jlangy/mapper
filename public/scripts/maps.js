const db = require("./index");

function initMap() {
  // The map
  const map_location = { lat: 48.4261, lng: -123.3642 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: map_location
  });
  // The pins
  const pin1_location = { lat: 48.4278, lng: -123.369 };
  const pin2_location = { lat: 48.4262, lng: -123.3616 };

  let marker1 = new google.maps.Marker({
    position: pin1_location,
    map: map
  });
  let marker2 = new google.maps.Marker({
    position: pin2_location,
    map: map
  });
}
