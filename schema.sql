CREATE TABLE Users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  passwordHash text NOT NULL,
  name text NOT NULL,
  image text
);
