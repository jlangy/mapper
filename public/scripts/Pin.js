//Classes depend on google API, return from function so
//they can be created in the initMap callback
const makePin = () => {
  return class Pin extends google.maps.Marker {
    constructor(position, map){
      super(position, map);
      this.title = '';
      this.description = '',
      this.imageUrl = '',

      //These functions used in callbacks, need a this binding
      this.savePinInfoBound = this.savePinInfo.bind(this);
      this.makeFormBound = this.makeForm.bind(this);
    }

    //Opens the infowindow on click and makes the form
    handlePinClick(){
      const infowindow = this.map.infowindow;
      infowindow.open(this.map, this);
      //remove old domready listener if present
      if(this.map.infoWindowReady) this.map.infoWindowReady.remove();
      this.map.infoWindowReady = infowindow.addListener('domready', this.makeFormBound);
    }

    setInfowindowFields(){
      $('#infowindow-title').val(this.title);
      $('#infowindow-description').val(this.description);
      $('#infowindow-imageUrl').val(this.imageUrl);
    }

    //Fills in pins form data if present and resets form listener
    makeForm(){
      this.setInfowindowFields();
      $('#infowindow-form').off();
      $('#infowindow-form').on('keyup', this.savePinInfoBound);
    }

    savePinInfo(event){
      const field = $(event.target).attr('name');
      this[field] = $(event.target).val();
    }
  }
}
