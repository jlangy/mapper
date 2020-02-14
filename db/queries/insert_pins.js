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
    if(params.lat){
      console.log('hit this route')
      const pinTitle = params.pinTitle === 'undefined' ? '' : params.pinTitle;
      const pinDescription = params.pinDescription === 'undefined' ? '' : params.pinDescription;
      const imageUrl = params.imageUrl === 'undefined' ? '' : params.imageUrl;
      db.query(pinsQuery + '($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), $8)',
      // [params.userId, params.mapId, params.pinTitle, params.pinDescription, params.lat, params.lng, params.imageUrl, params.active]);
      [params.userId, params.mapId, pinTitle, pinDescription, params.lat, params.lng, imageUrl, params.active]);
    }
  } else{
    //Multiple pins. Loop through arrays, building query values and parameters
    const pinQueries = [];
    const pinParams = [];
    params.pinTitle.forEach((pin, i) => {
      const pinTitle = params.pinTitle[i] === 'undefined' ? '' : params.pinTitle[i];
      const pinDescription = params.pinDescription[i] === 'undefined' ? '' : params.pinDescription[i];
      const imageUrl = params.imageUrl[i] === 'undefined' ? '' : params.imageUrl[i];
      pinQueries.push(pinsQuery + '($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), $8);');
      pinParams.push([params.userId, params.mapId, pinTitle, pinDescription, params.lat[i], params.lng[i], imageUrl, params.active[i]]);
    });
    //run all queries, no need to do it sequentially
    pinQueries.forEach((pinQuery,i) => {
      console.log(pinParams[i]);
      db.query(pinQuery, pinParams[i]);
    });
  }
}

module.exports = insertPins;
