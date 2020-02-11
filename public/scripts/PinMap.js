//Classes depend on google API, return from function so
//they can be created in the initMap callback
const makePinMap = () => {
  return class PinMap extends google.maps.Map{
    constructor(element, options, content){
      super(element, options);
      //Using one infowindow, resetting for each pin.
      //Api handles it auto closing when opened somewhere else
      this.infowindow = new google.maps.InfoWindow({
        content: content
      });
    }

    //Make a new pin on map clicks
    handleMapClick(event){
      const clickCoords = event.latLng;
      const pin = new Pin({
        position: clickCoords,
        map: this
      });
      //Temporarily store pins on window for logging/debugging purposes
      window.pins.push(pin);
      pin.addListener('click', pin.openForm);
    }
  }
}
