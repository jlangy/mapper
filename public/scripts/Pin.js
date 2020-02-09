const makePin = () => {
  return class Pin extends google.maps.Marker {
    constructor(position, map){
      super(position, map);
      this.title = '';
      this.description = '',
      this.imageUrl = '',
      this.savePinInfoBound = this.savePinInfo.bind(this);
      this.addFormListenerBound = this.addFormListener.bind(this);
      this.handlePinClickBound = this.handlePinClick.bind(this);
    }

    handlePinClick(){
      const infowindow = this.map.infowindow;
      infowindow.open(this.map, this);
      infowindow.addListener('domready', this.addFormListenerBound);
    }

    addFormListener(){
      $('#infowindow-form').on('keyup', this.savePinInfoBound);
    }

    savePinInfo(event){
      //the field (title, imgUrl, or description) saved in html data-field attr
      const field = $(event.target).attr('data-field');
      this[field] = $(event.target).val();
    }
  }
}
