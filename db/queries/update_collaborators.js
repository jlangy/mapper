const insertCollaborators = (db, mapId, email, active) => {
  console.log(mapId, email, active);
  let collaboratorQuery =`
  INSERT into collaborators (map_id, user_id, active) VALUES(
    $1,
    (SELECT id from users where email=$2),
    $3
  )
    ON CONFLICT (map_id, user_id) DO UPDATE
      SET active = $3;
  `
  if(!Array.isArray(email)){
    if(email){
      db.query(collaboratorQuery,
      [mapId, email, active]);
    }
  } else{
    //Multiple pins. Loop through arrays, building query values and parameters
    const collaboratorParams = [];
    email.forEach((email, i) => {
      collaboratorParams.push([mapId, email, active[i]]);
    });
    //run all queries, no need to do it sequentially
    collaboratorParams.forEach((collaboratorParam) => {
      db.query(collaboratorQuery, collaboratorParam)
      .catch(err => console.error(err));
    });
  }
}

module.exports = insertCollaborators;
