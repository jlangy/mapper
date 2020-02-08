DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id serial PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone varchar(32),
  created_at date,
  avatar varchar(255)
);

