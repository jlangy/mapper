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

    const pinInfoHTML = `
   <div id="content">
   <h5 id="infowindow-title" class="pinHeading"></h5>
   <div id="infowindow-description">
   <p></p>
   </div>
   <img id="infowindow-imageUrl">
   </div>
   `;

    // The map
    const map_location = position;
    map = new PinMap(document.getElementById("map"), {
      zoom: 12,
      center: map_location
    }, pinInfoHTML);

    // The pins
    for (const pin of pins) {

      marker = new Pin({ position: pin.location, map: map}, pin.title, pin.description, pin.imageUrl);
      console.log(pin.imageUrl);
      marker.addListener('click', marker.pinOpenInfoWindowBound);
      marker.title = pin.title;
      marker.description = pin.description;
      marker.imageUrl = pin.imageUrl;



    // infowindow = new google.maps.InfoWindow({
    //   content: pinInfoHTML
    // });

    //   marker.addListener('click', function() {
    //     infowindow.open(map, marker);
    //   });
    }
  }

  function pinOpenInfoWindow(){
    let pin = this;
    const infowindow = this.map.infowindow;
    infowindow.open(this.map, this);
    //remove old domready listener if present
    if(this.map.infoWindowReady) this.map.infoWindowReady.remove();
    this.map.infoWindowReady = infowindow.addListener('domready', pin.setInfowindowFieldsBound);
  }
