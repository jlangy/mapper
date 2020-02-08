-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id serial PRIMARY KEY NOT NULL,
  owner_id integer REFERENCES users (id) NOT NULL,
  title varchar(255) NOT NULL,
  description text,
  created_at timestamp NOT NULL,
  edited_at timestamp,
  deleted_at timestamp DEFAULT NULL,
  default_lat decimal DEFAULT NULL,
  default_long decimal DEFAULT NULL,
  collaborative boolean NOT NULL,
  public boolean DEFAULT FALSE NOT NULL,
  active boolean DEFAULT TRUE NOT NULL
);

