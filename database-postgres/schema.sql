CREATE SCHEMA IF NOT EXISTS slidedb AUTHORIZATION oh;

    CREATE TABLE slidedb.tblUsers (username varchar(50) primary key, password varchar(50) NOT NULL, avatarUrl varchar(2083), createdAt timestamp NOT NULL default NOW());
    CREATE TABLE slidedb.tblFriends (sender varchar(50), receiver varchar(50), wasAccepted boolean, CONSTRAINT pk PRIMARY KEY (sender,receiver), createdAt timestamp NOT NULL default NOW());
    CREATE TABLE slidedb.tblDms (dmId serial primary key, sender varchar(50) NOT NULL, receiver varchar(50) NOT NULL, message text NOT NULL, createdAt timestamp NOT NULL default NOW());