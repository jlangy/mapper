const makePin = () => {
  return class Pin extends google.maps.Marker {
    constructor(position, map){
      super(position, map);
      this.title = '';
      this.description = '',
      this.imageUrl = '',
      this.savePinInfoBound = this.savePinInfo.bind(this);
      this.makeFormBound = this.makeForm.bind(this);
    }

    handlePinClick(){
      const infowindow = this.map.infowindow;
      infowindow.open(this.map, this);
      if(this.map.infoWindowReady) this.map.infoWindowReady.remove();
      this.map.infoWindowReady = infowindow.addListener('domready', this.makeFormBound);
    }

    setInfowindowFields(){
      $('#infowindow-title').val(this.title);
      $('#infowindow-description').val(this.description);
      $('#infowindow-imageUrl').val(this.imageUrl);
    }

    makeForm(){
      this.setInfowindowFields();
      $('#infowindow-form').off();
      $('#infowindow-form').on('keyup', this.savePinInfoBound);
    }

    savePinInfo(event){
      //the field (title, imgUrl, or description) saved in html data-field attr
      const field = $(event.target).attr('data-field');
      this[field] = $(event.target).val();
    }
  }
}
