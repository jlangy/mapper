
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  let anchor;

  const marker1 = new google.maps.Marker({
    position: {lat: -34.397, lng: 150.644},
    map: map,
    title: 'Marker 1'
  });

  const marker2 = new google.maps.Marker({
    position: {lat: -34.497, lng: 150.844},
    map: map,
    title: 'Marker 2'
  });

  const infowindow1 = new google.maps.InfoWindow({
    content: '<h1>Hello WORLD! </h1>'
  });
  infowindow1.addListener('position_changed', () => {console.log(anchor)});
  infowindow1.addListener('closeclick', () => {console.log(anchor)});

  marker1.addListener('click', function() {
    //change content first
    infowindow1.setContent('<h1>Marker 1 clicked! </h1>')
    //open to change position before changing marker,
    //to fire event with closed marker to send off info
    infowindow1.open(map, marker1);
    anchor = marker1;
  });

  marker2.addListener('click', function() {
    infowindow1.setContent('<h1>marker 2 clicked! </h1>')
    infowindow1.open(map, marker2);
    anchor = marker2;
  });
}

