const updateFavourites = (db, params) => {
  // if favourites relationship exists delete if it doesnt exist create it
  params[2] = !params[2];
  const query = `
    INSERT into favourites (user_id, map_id, active) VALUES ($1, $2, true)
    ON CONFLICT (user_id, map_id) DO UPDATE SET active = $3;`
  return db.query(query, params);
}

module.exports = updateFavourites;
