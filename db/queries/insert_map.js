const insertMap = (db, params) => {
  //For collaborative and public (indices 3 and 4), if empty set to false
  params[5] = params[5] ? 'true' : 'false'
  params[6] = params[6] ? 'true' : 'false'
  const query = `
    INSERT INTO
      maps (
        owner_id,
        title,
        description,
        created_at,
        edited_at,
        default_lat,
        default_long,
        collaborative,
        public,
        active
      )
    VALUES (
      $1,
      $2,
      $3,
      NOW(),
      NOW(),
      $4,
      $5,
      $6,
      $7,
      true
      )
    RETURNING *;`;
  return db.query(query, params);
}

module.exports = insertMap;
// [userId, req.body.title, req.body.description, req.body.collaborative ? 'true' : 'false', req.body.public ? 'true' : 'false']
