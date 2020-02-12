const updateFavourites = (db, params) => {
  // if favourites relationship exists delete if it doesnt exist create it

  const query = `
    INSERT into favourites (user_id, map_id) VALUES ($1, $2)

  )
    ON CONFLICT DELETE FROM favourites WHERE user_id = $1 AND map_id = $2`;
  return db.query(query, params);
}

module.exports = updateFavourites;
