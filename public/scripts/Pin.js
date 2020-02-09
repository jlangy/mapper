const makePin = () => {
  return class Pin extends google.maps.Marker {
    constructor(position, map){
      super(position, map);
    }

    handlePinClick(){
      this.map.infowindow.open(this.map, this);
    }
  }
}
