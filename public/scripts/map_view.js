var map;
var marker;
var infowindow;
<<<<<<< HEAD
=======
const mapId = mapData.id;

>>>>>>> master

const position = { lat: Number(mapData.default_lat), lng: Number(mapData.default_long) };
const pins = [];
for (const pin of pinData) {
  if(pin.active){
<<<<<<< HEAD
    pins.push({location: { lat: Number(pin.lat), lng: Number(pin.long) }, title: pin.title, description: pin.description, imageUrl: pin.image_url});
=======
    pins.push({
      location: { lat: Number(pin.lat), lng: Number(pin.long) },
      title: pin.title,
      description: pin.description,
      imageUrl: pin.image_url
    });
>>>>>>> master
  }
}

function initMap() {

  const Pin = makePin();
  const PinMap = makePinMap();
<<<<<<< HEAD
=======
  const pinInfoHTML = `
  <div id="content">
  <h5 id="infowindow-title" class="pinHeading"></h5>
  <div id="infowindow-description">
  <p></p>
  </div>
  <img id="infowindow-imageUrl">
  </div>
  `;

    if (navigator.geolocation && !mapData.default_lat) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter());
    }

    window.map = map;
>>>>>>> master

  // The map
  addMap(PinMap, position, pinDisplayHTML(), mapData.default_lat);
  window.map = map;

<<<<<<< HEAD
  // The pins
  for (const pin of pins) {
=======
    // The pins
    for (const pin of pins) {

      marker = new Pin({ position: pin.location, map: map}, pin.title, pin.description, pin.imageUrl);
      console.log(pin.imageUrl);
      marker.addListener('click', marker.pinOpenInfoWindowBound);
      marker.title = pin.title;
      marker.description = pin.description;
      marker.imageUrl = pin.imageUrl;

  // The pins
  for (const pin of pins) {

>>>>>>> master
    marker = new Pin({ position: pin.location, map: map}, pin.title, pin.description, pin.imageUrl);
    marker.addListener('click', marker.pinOpenInfoWindowBound);
    marker.title = pin.title;
    marker.description = pin.description;
    marker.imageUrl = pin.imageUrl;
  }
}
<<<<<<< HEAD

=======
}

function pinOpenInfoWindow(){
  let pin = this;
  const infowindow = this.map.infowindow;
  infowindow.open(this.map, this);
  //remove old domready listener if present
  if(this.map.infoWindowReady) this.map.infoWindowReady.remove();
  this.map.infoWindowReady = infowindow.addListener('domready', pin.setInfowindowFieldsBound);
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
  })
})
>>>>>>> master
