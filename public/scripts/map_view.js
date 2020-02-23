const mapId = mapData.id;

function initMap() {

  window.Pin = makePin();
  const PinMap = makePinMap();

  const mapPosition = { lat: Number(mapData.default_lat), lng: Number(mapData.default_long) };
  //Check for a default lat, if supplied position was given. Else use users position
  const positionGiven = mapData.default_lat;

  window.map = addMap(PinMap, mapPosition, pinDisplayHTML(), positionGiven);

  window.pinObjs = pinData.map(pin => {
    const position = { lat: Number(pin.lat), lng: Number(pin.long) }
    marker = new Pin({ position, map: window.map}, pin.title, pin.description, pin.image_url, pin.id);
    marker.addListener('click', marker.pinOpenInfoWindowBound);
    marker.displayed = true;
    return marker;
  })
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
    addPinToUserDistances();
  }

  addPinsHover($('.pins-display'));
})

const addPinToUserDistances = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    for(const pin of window.pinObjs){
      const distance = latLongDistance(pos.lat, pin.position.lat(), pos.lng, pin.position.lng());
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
    handleLocationError(true, window.map.getCenter());
  });
}
