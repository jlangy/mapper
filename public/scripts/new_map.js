$(document).ready(() => {
  window.collaborators = [];
  $('#info-log').on('click', () => {
    window.pins.forEach(pin => {
      console.log(`title: ${pin.title}, description: ${pin.description}, imgUrl: ${null}, `)
    })
  });

  $('#add-collaborator-btn').on('click', (event) => {
    event.preventDefault();
    const collaborator = $('#collaborators-input').val();
    $('#collaborators-list').append($('<input class="list-group-item" disabled></input>').val(collaborator));
    window.collaborators.push(collaborator);
  });

  $('#new-map-form').on('submit', function(event){
    event.preventDefault();
    let data = $(this).serialize();
    for (pin of window.pins){
      //encodeURIComponent sanitizes data, the pins will come through
      //3 arrays, pinTitle, pinDescription, imageUrl in order
      data += `&pinTitle=${encodeURIComponent(pin.title)}&pinDescription=${encodeURIComponent(pin.description)}&imageUrl=${encodeURIComponent(pin.imageUrl)}&lat=${encodeURIComponent(pin.getPosition().lat())}&lng=${encodeURIComponent(pin.getPosition().lng())}`
    }
    for (collaborator of window.collaborators){
      data += `&collaborator=${encodeURIComponent(collaborator)}`
    }
    saveMap(data);
  });
});

const pinFormHTML =
` <form id='infowindow-form'>
    <div class="form-group">
      <label for="infowindow-title">Title</label>
      <input type="text" class="form-control" id="infowindow-title" name='title' placeholder="Title">
    </div>
    <div class="form-group">
      <label for="infowindow-description">Description</label>
      <textarea type="text" class="form-control" id="infowindow-description" name='description'></textarea>
    </div>
    <div class="form-group">
      <label for="infowindow-imageUrl">Image URL</label>
      <input type="text" class="form-control" id="infowindow-imageUrl" name='imageUrl' placeholder="https://www">
    </div>
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
    center: {lat: 48.4261,  lng: - 123.3642},
    zoom: 8
  }, pinFormHTML);

  map.addListener('click', map.handleMapClick)
}

