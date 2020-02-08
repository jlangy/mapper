DROP TABLE IF EXISTS map_categories CASCADE;

CREATE TABLE map_categories (
  id serial PRIMARY KEY NOT NULL,
  map_id integer REFERENCES maps(id) NOT NULL,
  categories_id integer REFERENCES categories(id) NOT NULL
);
