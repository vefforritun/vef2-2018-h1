CREATE TABLE Users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  passwordHash text NOT NULL,
  name text NOT NULL,
  image text
);

CREATE TABLE Categories (
  id serial PRIMARY KEY,
  category varchar(50) UNIQUE NOT NULL
);

CREATE TABLE Books (
  id serial PRIMARY KEY,
  title text NOT NULL,
  isbn varchar(13) UNIQUE NOT NULL,
  author text,
  description text,
  category int NOT NULL
);
