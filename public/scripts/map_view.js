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
    });
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      for(const pin of pins){
        const distance = latLongDistance(pos.lat, pin.location.lat, pos.lng, pin.location.lng);
        if (distance > 1000){
          distStr = Math.round(distance / 1000, 1) + 'km'
        } else {
          distStr = Math.round(distance, 0) + 'm';
        }
        $(`.pins-display[data-pin-id=${pin.id}]`).append($('<div>')
          .text(distStr)
        );
      }

    }, function() {
      handleLocationError(true, map.getCenter());
    });
  }

  function handleLocationError(browserHasGeolocation, pos) {
    console.log('not fond');
  }

  $('.pins-display').mouseenter(function(event){
    event.preventDefault();
    const pinId = $(event.target).attr('data-pin-id');
    const hoverPin = window.pinObjs.filter(pin => pin.id == pinId)[0];
    hoverPin.displayInfo();
  }, );
})
