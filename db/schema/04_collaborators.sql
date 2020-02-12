DROP TABLE IF EXISTS collaborators CASCADE;

CREATE TABLE collaborators (
  id serial PRIMARY KEY NOT NULL,
  map_id integer REFERENCES maps(id) NOT NULL,
  user_id integer REFERENCES users(id) NOT NULL,
  active boolean NOT NULL,
  unique (map_id, user_id)
);
