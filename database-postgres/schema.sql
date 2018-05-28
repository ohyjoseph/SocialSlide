CREATE SCHEMA IF NOT EXISTS slidedb AUTHORIZATION oh;

    CREATE TABLE tblUsers (username varchar(50) PRIMARY KEY, password varchar(50) NOT NULL, avatarUrl varchar(2083), createdAt timestamp NOT NULL default NOW());
    CREATE TABLE tblFriends (sender varchar(50) REFERENCES tblUsers(username), receiver varchar(50) REFERENCES tblUsers(username), wasAccepted boolean, CONSTRAINT pk PRIMARY KEY (sender,receiver), createdAt timestamp NOT NULL default NOW());
    CREATE TABLE tblDms (dmId serial PRIMARY KEY, sender varchar(50) NOT NULL REFERENCES tblUsers(username), receiver varchar(50) NOT NULL REFERENCES tblUsers(username), message text NOT NULL, createdAt timestamp NOT NULL default NOW());