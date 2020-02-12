DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites (
  id serial PRIMARY KEY NOT NULL,
  user_id integer REFERENCES users (id),
  map_id integer REFERENCES maps (id),
  active boolean DEFAULT false,
  unique (user_id, map_id)
);

