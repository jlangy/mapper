## USER STORIES

* as a user, I can see a list of public maps available to me including defaults
  * Given I am a user, When I visit the main page, then I see a list of maps in my area
  * GET '/', GET '/maps'

* As a user, I can click on a map to view it
  * Given I am a user, when I click on a map, then I am redirected to that maps page
  * GET '/', GET '/maps' =>  GET '/maps/:id'

* As a user, I can create my own map
  * Given I am a logged in user, when I cick on create map, I can enter the maps information and click create to create it
  * GET '/maps/new' => POST '/maps'

* As a user, I can add multiple pins to my map
  * Given I am a logged in user, When I one of my maps, I can create a pin and enter details
  * GET '/maps/:id', PUT '/maps/:id' as ajax

* As a user, I can add collaberators to my maps so they can edit
  * Given I am logged in, when I visit one of my maps edit pages, I can add new collaberators
  * GET '/maps/:id/edit', PUT '/maps/:id'

* (stretch) As a user, I can remove collaberators from my maps
  * Given I am logged in, when I visit one of my maps edit pages, I can remove collaberators
  * GET '/maps/:id/edit', PUT '/maps/:id'

* (stretch) As a user, I can delete my maps 
  * Given I am logged in, when I visit one of my maps, I can delete it
  * GET '/maps/:id', DELETE '/maps/:id'

* As a user, I can delete my pins
  * Given I am logged in, when I visit a map Im a collaberator of, I can delete a pin I own
  * GET '/maps/:id/edit', PUT '/maps/:id'

* As a user, I can edit all maps I am a owner of
  * Given I am logged in, when I visit a map I am a owner of, I can navigate to the edit page and edit it 
  * GET '/maps/:id/edit', PUT '/maps/:id'

* As a user, I can favourite a map
  * Given I am logged in, when I am viewing a map (on maps/:id or maps), then I can favourtie it
  * GET '/maps/:id', GET '/maps', POST '/favourites'

* As a user, I can unfavourite a map
  * Given I am logged in, when I am viewing a map (on maps/:id or maps), then I can unfavourtie it
  * GET '/maps/:id', GET '/maps', DELETE '/favourites/:id'

* As a user, I can view a list of my favourite maps
  * Given I am logged in, when I visit my favourites page, I can see a list of all my favourites
  * GET '/users/:id/favourites'

* As a user, I can view a list of maps I created or collaberate on
  * Given I am logged in, when I click on my maps, I can view a list of all maps I can edit
  * GET '/users/:id/mymaps'

## DATA SOURCES

* Caroline 

* Leafletjs

* Phone/Desktop geolocation

* DB



