const updatePins = (db, params) => {
  //dont worry about deleting, just set active to false
  let pinsQuery = `
    UPDATE pins SET
      title = $1,
      description = $2,
      image_url = $3,
      edited_at = NOW(),
      active = $4
    WHERE
      id = $5
;`;
  //Edge cases: if 1 or 0 pins, wont be an array
  if(!Array.isArray(params.pinTitle)){
    //If A single pin insert, else map has no pins and skip
    if(params.pinTitle){
      db.query(pinsQuery,
      [params.pinTitle, params.pinDescription, params.imageUrl, params.active, params.pinId]);
    }
  } else{
    //Multiple pins. Loop through arrays, building query values and parameters
    const pinParams = [];
    params.pinTitle.forEach((pin, i) => {
      pinParams.push([params.pinTitle[i], params.pinDescription[i], params.imageUrl[i], params.active, params.pinId[i]]);
    });
    //run all queries, no need to do it sequentially
    pinParams.forEach((pinQuery,i) => {
      db.query(pinsQuery, pinParams[i]);
    });
  }
}

module.exports = updatePins;
