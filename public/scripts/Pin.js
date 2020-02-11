//Classes depend on google API, return from function so
//they can be created in the initMap callback
const makePin = () => {
  return class Pin extends google.maps.Marker {
    constructor(position, map, title, description, imageUrl){
      super(position, map);
      this.title = title;
      this.description = description;
      this.imageUrl = imageUrl;
      //These functions used in callbacks, need a this binding
      this.savePinInfoBound = this.savePinInfo.bind(this);
      this.makeFormBound = this.makeForm.bind(this);
      this.setInfowindowFieldsBound = this.setInfowindowFields.bind(this);
      this.pinOpenInfoWindowBound = this.pinOpenInfoWindow.bind(this);

    }

    //Opens the infowindow on click and makes the form
    openForm(){
      const infowindow = this.map.infowindow;
      infowindow.open(this.map, this);
      //remove old domready listener if present
      if(this.map.infoWindowReady) this.map.infoWindowReady.remove();
      this.map.infoWindowReady = infowindow.addListener('domready', this.makeFormBound);

    }

    //same as open form, but setting the fields instead of building a form
    //with listeners. Needs to be bound
    displayInfo(){
      const infowindow = this.map.infowindow;
      infowindow.open(this.map, this);
      //remove old domready listener if present
      if(this.map.infoWindowReady) this.map.infoWindowReady.remove();
      this.map.infoWindowReady = infowindow.addListener('domready', this.setInfowindowFieldsBound);
    }

    setInfowindowFields(){
      $('#infowindow-title').text(this.title);
      $('#infowindow-description').text(this.description);
      $('#infowindow-imageUrl').text(this.imageUrl);
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
    pinOpenInfoWindow(){
      let pin=this;
      const infowindow = this.map.infowindow;
      infowindow.open(this.map, this);
      //remove old domready listener if present
      if(this.map.infoWindowReady) this.map.infoWindowReady.remove();
      this.map.infoWindowReady = infowindow.addListener('domready', pin.setInfowindowFieldsBound);
    }
  }
}
