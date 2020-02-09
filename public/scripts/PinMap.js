const makePinMap = () => {
  return class PinMap extends google.maps.Map{
    constructor(DOMelement, options, infoHTML){
      super(DOMelement, options)
      this.infowindow = new google.maps.InfoWindow({
        content: infoHTML
      });
    }

    handleMapClick(event){
      const clickCoords = event.latLng;
      const pin = new Pin({
        position: clickCoords,
        map: this
      });
      pin.addListener('click', pin.handlePinClick);
    }
  }
}
