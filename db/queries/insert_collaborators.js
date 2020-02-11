const insertCollaborators = (db, mapId, params) => {
  let collaboratorQuery = `
    INSERT INTO
      collaborators (
        map_id,
        user_id,
        active
      )
    VALUES `;

  if(!Array.isArray(params)){
    if(params){
      db.query(collaboratorQuery + '($1, (SELECT id from users where email=$2), true)',
      [mapId, params]);
    }
  } else{
    //Multiple pins. Loop through arrays, building query values and parameters
    const collaboratorQueries = [];
    const collaboratorParams = [];
    params.forEach((email, i) => {
      collaboratorQueries.push(collaboratorQuery + '($1, (SELECT id from users where email=$2), true);');
      collaboratorParams.push([mapId, email]);
    });
    //run all queries, no need to do it sequentially
    collaboratorQueries.forEach((collaboratorQuery,i) => {
      console.log("important info", collaboratorQuery, collaboratorParams[i]);
      db.query(collaboratorQuery, collaboratorParams[i])
      .catch(err => console.error(err));
    });
  }
}

module.exports = insertCollaborators;
