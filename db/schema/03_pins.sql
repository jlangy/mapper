DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id serial PRIMARY KEY NOT NULL,
  owner_id integer REFERENCES users (id),
  map_id integer REFERENCES maps (id),
  title varchar(255),
  description text,
  lat decimal NOT NULL,
  long decimal NOT NULL,
  image_url varchar(255),
  created_at timestamp NOT NULL,
<<<<<<< HEAD
  edited_at timestamp,
  deleted_at timestamp DEFAULT NULL,
=======
  edited_at timestamp NOT NULL,
  deleted_at timestamp,
>>>>>>> new_map
  active boolean NOT NULL DEFAULT TRUE
);

