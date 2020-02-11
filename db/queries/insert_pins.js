const insertPins = (db, params) => {
  let pinsQuery = `
    INSERT INTO
      pins (
        owner_id,
        map_id,
        title,
        description,
        lat,
        long,
        image_url,
        created_at,
        edited_at,
        active
      )
    VALUES `;

  //Edge cases: if 1 or 0 pins, wont be an array
  if(!Array.isArray(params.pinTitle)){
    //If A single pin insert, else map has no pins and skip
    if(params.pinTitle){
      db.query(pinsQuery + '($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), true)',
      [params.userId, params.mapId, params.pinTitle, params.pinDescription, params.lat, params.lng, params.imageUrl]);
    }
  } else{
    //Multiple pins. Loop through arrays, building query values and parameters
    const pinQueries = [];
    const pinParams = [];
    params.pinTitle.forEach((pin, i) => {
      pinQueries.push(pinsQuery + '($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), true);');
      pinParams.push([params.userId, params.mapId, params.pinTitle[i], params.pinDescription[i], params.lat[i], params.lng[i], params.active]);
    });
    //run all queries, no need to do it sequentially
    pinQueries.forEach((pinQuery,i) => {
      db.query(pinQuery, pinParams[i]);
    });
  }
}

module.exports = insertPins;
