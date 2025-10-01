SELECT 'CREATE DATABASE university_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'university_db');

\c university_db;

CREATE TABLE IF NOT EXISTS universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);