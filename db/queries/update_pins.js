const updatePins = (db, params) => {
  //dont worry about deleting, just set active to false
  const queries = [];
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
      const pinTitle = params.pinTitle === 'undefined' ? '' : params.pinTitle;
      const pinDescription = params.pinDescription === 'undefined' ? '' : params.pinDescription;
      const imageUrl = params.imageUrl === 'undefined' ? '' : params.imageUrl;
      queries.push(db.query(pinsQuery,
        [params.owner_id,
         params.mapId,
         pinTitle,
         pinDescription,
         params.lat,
         params.long,
         imageUrl,
         params.active]));
    }
  } else{
    //Multiple pins. Loop through arrays, building query values and parameters
    const pinParams = [];
    params.pinTitle.forEach((pin, i) => {
      const pinTitle = params.pinTitle[i] === 'undefined' ? '' : params.pinTitle[i];
      const pinDescription = params.pinDescription[i] === 'undefined' ? '' : params.pinDescription[i];
      const imageUrl = params.imageUrl[i] === 'undefined' ? '' : params.imageUrl[i];
      pinParams.push([params.owner_id, params.mapId, pinTitle, pinDescription, params.lat[i], params.long[i], imageUrl, params.active[i]]);
    });
    //run all queries, no need to do it sequentially
    pinParams.forEach((pinQuery,i) => {
      queries.push(db.query(pinsQuery, pinParams[i]))
    });
  }
  return queries;
}

module.exports = updatePins;
