DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
  id serial PRIMARY KEY NOT NULL,
  category varchar(255)
);

