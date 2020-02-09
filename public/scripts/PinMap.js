const makePinMap = () => {
  return class PinMap extends google.maps.Map{
    constructor(element, options){
      super(element, options)
      this.infowindow = new google.maps.InfoWindow({
        content: pinFormHTML
      });
    }

    handleMapClick(event){
      const clickCoords = event.latLng;
      const pin = new Pin({
        position: clickCoords,
        map: this
      });
      //Temporarily store pins on window for logging/debugging purposes
      window.pins.push(pin);
      pin.addListener('click', pin.handlePinClick);
    }


  }
}
