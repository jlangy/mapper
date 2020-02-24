const insertCollaborators = (db, mapId, email, active) => {
  const queries = [];
  let collaboratorQuery =`
  INSERT into collaborators (map_id, user_id, active) VALUES(
    $1,
    (SELECT id from users where email=$2),
    $3
  )
    ON CONFLICT (map_id, user_id) DO UPDATE
      SET active = $3;
  `
  //single entry logic. Paramaters won't be an array
  if(!Array.isArray(email)){
    if(email){
      queries.push(db.query(collaboratorQuery,
      [mapId, email, active]));
    }
  } else{
    //Multiple pins. Loop through arrays, building query values and parameters
    const collaboratorParams = [];
    email.forEach((email, i) => {
      collaboratorParams.push([mapId, email, active[i]]);
    });
    //run all queries, no need to do it sequentially
    collaboratorParams.forEach((collaboratorParam) => {
      queries.push(db.query(collaboratorQuery, collaboratorParam));
    });
  }
  return queries;
}

module.exports = insertCollaborators;
