const pins = [{title: 'habit', description: 'coffee', lat:-34.397, lng: 150.644},{title: 'brewhouse', description: 'beer', lat:-34.497, lng: 150.744}]

const map = {title: 'coffee spots', description: 'map', lat:-34.397, lng: 150.644}

const infoHTML = `
  <div style='width:200px'>
    <h1 id='infowindow-title'></h1>
    <p id='infowindow-description'></p>
  </div>
`

function initMap(){
  //currently putting class on window. Not sure if bad practice or not
  //but needs to be accessible to pinmap click listener
  const Pin = makePin();
  const PinMap = makePinMap();

  //For logging out info during developement, put pins on window
  window.pins = [];

  const map = new PinMap(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  }, infoHTML);

  for(const pin of pins){
    const position = {lat: pin.lat, lng: pin.lng}
    const marker = new Pin({position, map}, pin.title, pin.description);
    //defined new function in pin class. Function needs this binding
    marker.addListener('click', marker.displayInfoBound);
  }

}
