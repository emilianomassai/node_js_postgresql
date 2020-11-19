-- How to create a new database:
-- CREATE DATABASE familyhistorydemo;
-- to connect to another database from local server:
-- \c familyhistorydemo
-- create the table person, used to store all the information
CREATE TABLE person (
    id SERIAL PRIMARY KEY NOT NULL,
    first VARCHAR(100) NOT NULL,
    last VARCHAR(100),
    birthdate date
);
-- populate the person table:
INSERT INTO person (first, last, birthdate)
VALUES ('Emiliano', 'Massai', '1984-09-21');
INSERT INTO person (first, last, birthdate)
VALUES ('Pippo', 'Camillo', '1974-03-16');
INSERT INTO person (first, last, birthdate)
VALUES ('Mary', 'Camillo', '1977-08-08');
-- see if the table is populated:
SELECT *
FROM person;
-- protect the database creating a new user without admin permissions
CREATE USER familyhistoryuser WITH PASSWORD 'elijah';
-- grant some permissions to the new user, to interact with the 'person' table
GRANT SELECT,
    INSERT,
    UPDATE ON person TO familyhistoryuser;
-- grant permissions to the user to work with the person_id sequence
GRANT USAGE,
    SELECT ON SEQUENCE person_id_seq TO familyhistoryuser;
-- try to connect to the database with the familyhistoryuser created above:
-- psql - Ufamilyhistoryuser familyhistorydemo