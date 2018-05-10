CREATE TABLE IF NOT EXISTS users  (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  company_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    user_id INTEGER REFERENCES users (id)
);


CREATE TABLE IF NOT EXISTS categories (
    id SERIAL NOT NULL PRIMARY KEY,
    model_id INTEGER REFERENCES models(id),
    name VARCHAR(100) NOT NULL
);


CREATE TYPE t_category AS ENUM ('revenue', 'expenses');

CREATE TABLE IF NOT EXISTS submodels (
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    model_id INTEGER REFERENCES models (id),
    param_min DECIMAL(12,2),
    param_max DECIMAL(12,2),
    category t_category,
    name VARCHAR(100) NOT NULL,
    expression TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS variables (
    id SERIAL PRIMARY KEY,
    model_id INTEGER REFERENCES models(id),
    name VARCHAR(100) NOT NULL,
    value FLOAT NOT NULL
);
