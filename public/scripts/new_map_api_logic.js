$(document).ready(() => {
  $('#info-log').on('click', () => {
    window.pins.forEach(pin => {
      console.log(`title: ${pin.title}, description: ${pin.description}, imgUrl: ${null}, `)
    })
  });
});

let listener = null;

const pinFormHTML =
` <form id='infowindow-form'>
    <div class="form-group">
      <label for="infowindow-title">Title</label>
      <input type="text" class="form-control" id="infowindow-title" data-field='title' placeholder="Example input" required>
    </div>
    <div class="form-group">
      <label for="infowindow-description">Another label</label>
      <input type="text" class="form-control" id="infowindow-description" data-field='description' placeholder="Another input" required>
    </div>
    <button id='add-pin-button' class='btn btn-primary'>save</button>
  </form>
`;



function initMap(){
  //currently putting class on window. Not sure if bad practice or not
  //but needs to be accessible to pinmap click listener
  window.Pin = makePin();
  const PinMap = makePinMap();

  //For logging out info during developement, put pins on window
  window.pins = [];

  const map = new PinMap(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  }, pinFormHTML);

  map.addListener('click', map.handleMapClick)
}

