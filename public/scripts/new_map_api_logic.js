
let map;

//Save pins in array until map is created, to avoid unnecessary DB entries
//if map abandoned
const pins = [];

const savePinfo = function(event){
  event.preventDefault();
  //need this for each form input
  console.log($(this).parent().find('input').val());
}


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  const infowindow = new google.maps.InfoWindow({
    content: '<h1>Hello WORLD! </h1>'
  });

  infowindow.addListener('domready', () => {
    $('#add-pin-button').on('click', savePinfo);
  });


  let anchor;

  //Going to switch to save button. Relevant events for auto save on exit
  // infowindow.addListener('position_changed', () => {console.log(anchor)});
  // infowindow.addListener('closeclick', () => {console.log(anchor)});

  const handleMapClick = (event) => {
    const clickCoords = event.latLng;
    console.log(event.latLng);
    const pin = new google.maps.Marker({
      position: clickCoords,
      map: map,
      title: 'Marker'
    });
    pin.addListener('click', () => {
      infowindow.setContent(`
      <form>
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
    `);
    infowindow.open(map, pin);

    // setTimeout(() => {
    //   $('#add-pin-button').on('click', () => {console.log('hi')});
    // }, 0);
    });
    pins.push(pin);
  }

  map.addListener('click', handleMapClick);
}

