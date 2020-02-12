const insertCollaborators = (db, mapId, email, active) => {
  let collaboratorQuery =`
  INSERT into collaborators (map_id, user_id, active) VALUES(
    $1,
    (SELECT id from users where email=$2),
    $3
  )
    ON CONFLICT (map_id, user_id) DO UPDATE
      SET active = $3;
  `
  if(!Array.isArray(user_id)){
    if(user_id){
      db.query(collaboratorQuery,
      [mapId, email, active]);
    }
  } else{
    //Multiple pins. Loop through arrays, building query values and parameters
    const collaboratorParams = [];
    params.forEach((email, i) => {
      collaboratorParams.push([mapId, email[i], active[i]]);
    });
    //run all queries, no need to do it sequentially
    collaboratorParams.forEach((collaboratorQuery,i) => {
      db.query(collaboratorQuery, collaboratorParams[i])
      .catch(err => console.error(err));
    });
  }
}

module.exports = insertCollaborators;
