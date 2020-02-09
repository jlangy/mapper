
const pinFormHTML =
` <form>
    <div class="form-group">
      <label for="formGroupExampleInput">Example label</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" required>
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Another label</label>
      <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input" required>
    </div>
    <button id='add-pin-button' class='btn btn-primary'>save</button>
  </form>
`;


function initMap(){
  //currently putting class on window. Not sure if bad practice or not
  //but needs to be accessible to pinmap click listener
  window.Pin = makePin();
  const PinMap = makePinMap();

  const map = new PinMap(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  }, pinFormHTML);

  map.addListener('click', map.handleMapClick)

}
