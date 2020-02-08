DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id serial PRIMARY KEY NOT NULL,
  owner_id integer NOT NULL,
  map_id integer NOT NULL,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  lat decimal NOT NULL,
  long decimal NOT NULL,
  image_url varchar(255),
  created_at date,
  edited_at date,
  deleted_at date,
  active boolean NOT NULL DEFAULT TRUE
);

