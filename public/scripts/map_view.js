// need to make a get request to maps_json where we query the db to get maps/pins data to pass
// into initMap function to render any map with the saved pins

var map;
var marker;
var infowindow;

console.log(pinData);
  const position = { lat: Number(mapData.default_lat), lng: Number(mapData.default_long) };
  const pins = [];
  for (const pin of pinData) {
    pins.push({location: { lat: Number(pin.lat), lng: Number(pin.long) }, title: pin.title});

  }


  function initMap() {
    // The map
    const map_location = position;
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: map_location
    });

    // The pins
    for (const pin of pins) {
      marker = new google.maps.Marker({
        position: pin.location,
        map: map,
        title: pin.title
      });

      var contentString = `
     <div id="content">
     <h3 id="pinHeading" class="pinHeading">${pin.title}</h3>
     <div id="bodyContent">
      <p>${pin.description}</p>
     </div>
     </div>
     `;

    infowindow = new google.maps.InfoWindow({
      content: contentString
    });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }

  }
