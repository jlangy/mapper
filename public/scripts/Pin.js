//Classes depend on google API, return from function so
//they can be created in the initMap callback
const makePin = () => {
  return class Pin extends google.maps.Marker {
    constructor(options, title, description, imageUrl, id){
      super(options);
      this.title = title;
      this.description = description;
      this.imageUrl = imageUrl;
      this.id = id;
      this.active = true;
      //These functions used in callbacks, need a this binding
      this.savePinInfoBound = this.savePinInfo.bind(this);
      this.setInfowindowFieldsBound = this.setInfowindowFields.bind(this);
      this.pinOpenInfoWindowBound = this.pinOpenInfoWindow.bind(this);
      this.deletePinBound = this.deletePin.bind(this);
      this.savePinBound = this.savePin.bind(this);
    }

    //Opens the infowindow on click and makes the form
    openForm(){
      const infowindow = this.map.infowindow;
      infowindow.open(this.map, this);
      //remove old domready listener if present
      if(this.map.infoWindowReady) this.map.infoWindowReady.remove();
      this.map.infoWindowReady = infowindow.addListener('domready', this.setInfowindowFieldsBound);
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
      $('#infowindow-title').val(this.title);
      $('#infowindow-description').val(this.description);
      $('#infowindow-imageUrl').val(this.imageUrl);
      $('#infowindow-imageUrl').attr('src', this.imageUrl);
      $('#infowindow-form').off();
      $('#infowindow-form').on('keyup', this.savePinInfoBound);
      $('#delete-pin').off();
      $('#delete-pin').on('click', this.deletePinBound);
      $('#save-pin').off();
      $('#save-pin').on('click', this.savePinBound);
    }

    savePin(event){
      this.updated = true;
      event.preventDefault();
      this.map.infowindow.close();
      updatePinsDisplays(this);
    }

    deletePin(event){
      event.preventDefault();
      this.updated = true;
      const id = this.id || this.tempId;
      $(`.pins-display[data-pin-id="${String(id)}"]`).remove();
      this.active=false;
      this.setMap(null);
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
