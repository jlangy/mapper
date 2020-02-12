const updatePins = (db, params) => {
  //dont worry about deleting, just set active to false
  let pinsQuery = `
    INSERT into pins (owner_id, map_id, title, description, lat, long, image_url, created_at, edited_at, active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), $8)
    ON CONFLICT (map_id, lat, long) DO

    UPDATE SET
      title = $3,
      description = $4,
      image_url = $7,
      edited_at = NOW(),
      active = $8
;`;
  //Edge cases: if 1 or 0 pins, wont be an array
  if(!Array.isArray(params.pinTitle)){
    //If A single pin insert, else map has no pins and skip
    if(params.pinTitle){
      db.query(pinsQuery,
      [params.owner_id, params.mapId, params.pinTitle, params.pinDescription, params.lat, params.long, params.imageUrl, params.active]);
    }
  } else{
    //Multiple pins. Loop through arrays, building query values and parameters
    const pinParams = [];
    params.pinTitle.forEach((pin, i) => {
      pinParams.push([params.owner_id, params.mapId, params.pinTitle[i], params.pinDescription[i], params.lat[i], params.long[i], params.imageUrl[i], params.active[i]]);
    });
    //run all queries, no need to do it sequentially
    pinParams.forEach((pinQuery,i) => {
      db.query(pinsQuery, pinParams[i]);
    });
  }
}

module.exports = updatePins;
