CREATE DATABASE todoapp;
CREATE TABLE todos(
    id varchar(25) PRIMARY KEY,
    user_email varchar(225),
    title varchar(30),
    progress INT,
    date varchar(30)
);

