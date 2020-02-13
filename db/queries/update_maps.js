const updateMap = (db, params) => {
  //For collaborative and public (indices 3 and 4), if empty set to false
  params[2] = params[2] ? 'true' : 'false';
  params[3] = params[3] ? 'true' : 'false';
  const query = `
    UPDATE maps
      SET
        title = $1,
        description = $2,
        edited_at = NOW(),
        collaborative = $3,
        public = $4,
        default_lat = $5,
        default_long = $6
      WHERE
        id = $7
    ;`;
  return db.query(query, params);
}

module.exports = updateMap;
// [userId, req.body.title, req.body.description, req.body.collaborative ? 'true' : 'false', req.body.public ? 'true' : 'false']
