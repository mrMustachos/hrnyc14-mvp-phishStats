DROP DATABASE IF EXISTS mvp_phish;

CREATE DATABASE mvp_phish;

USE mvp_phish;

CREATE TABLE items (
  id int NOT NULL AUTO_INCREMENT,
  quantity integer NOT NULL,
  description varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
