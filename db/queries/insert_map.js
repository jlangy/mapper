const insertMap = (db, params) => {
  //For collaborative and public (indices 3 and 4), if empty set to false
  params[3] = params[3] ? 'true' : 'false'
  params[4] = params[4] ? 'true' : 'false'
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
      48.4261,
      -123.3642,
      $4,
      $5,
      true
      )
    RETURNING *;`;
  return db.query(query, params);
}

module.exports = insertMap;
// [userId, req.body.title, req.body.description, req.body.collaborative ? 'true' : 'false', req.body.public ? 'true' : 'false']
