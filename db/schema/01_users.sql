DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id serial PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone varchar(32) NOT NULL,
  created_at timestamp NOT NULL,
  avatar varchar(255)
);

