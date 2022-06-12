CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    completed boolean
);

ALTER TABLE todo
ADD COLUMN completed BOOLEAN DEFAULT FALSE;