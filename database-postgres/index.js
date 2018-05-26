const pg = require('pg');
const config = require('./config');

var conString = process.env.DATABASE_URL || config.localPsqlConString;

let client = new pg.Client(conString);
client.connect((err) => {
  if (err) {
    return console.error('ERROR connecting to postgres:', err);
  }
  return console.log('CONNECTED to postgres slidedb!');
});

 function selectUser (params, cb) {
  let queryString = 'SELECT * FROM tblUsers WHERE username = $1';
  client.query(queryString, [params.username], (err, result) => {
    if (err) {
      return console.error('ERROR running query:', err);
    }
    if (result.rowCount < 1) {
      return console.error('User does NOT exist');
    }
    cb(result.rows);
  });
}

function checkLogin (params, cb) {
  let queryString = 'SELECT * FROM tblUsers WHERE username = $1 AND password = $2'; 
  client.query(queryString, [params.username, params.password], (err, result) => {
    if (err) {
      return console.error('ERROR running query:', err);
    }
    if (result.rowCount < 1) {
      return console.error('NOT a correct username and password');
    }
    cb(result.rows);
  });
}

function insertUser (params, cb) {
  if (!params.avatarUrl || params.avatarUrl === '') {
    params.avatarUrl = null;
  }

  let queryString = 'INSERT INTO tblUsers (username, password, avatarUrl) VALUES ($1, $2, $3)';
  client.query(queryString, [params.username, params.password, params.avatarUrl], (err, result) => {
    if (err) {
      return console.error('ERROR inserting user:', err);
    }
    cb(result);
  });
}

function insertMessage (params, cb) {
  let queryString = 'INSERT INTO tblDms (sender, receiver, message) VALUES ($1, $2, $3)';
  client.query(queryString, [params.sender, params.receiver, params.message], (err, result) => {
    if (err) {
      return console.error('ERROR inserting message:', err);
    }
    cb(result);
  });
}

function insertFriendRequest (params, cb) {
  let queryString = 'INSERT INTO tblFriends (sender, receiver) VALUES ($1, $2)';
  client.query(queryString, [params.sender, params.receiver], (err, result) => {
    if (err) {
      return console.error('ERROR inserting friend request:', err);
    }
    cb(result);
  });
}

function updateFriendRequest (params, cb) {
  let queryString = 'UPDATE tblFriends set wasAccepted = $1 WHERE sender = $2 AND receiver = $3';
  client.query(queryString, [params.wasAccepted, params.sender, params.receiver], (err, result) => {
    if (err) {
      return console.error('ERROR updating friend request:', err);
    }
    cb(result);
  });
}

//Database method test scripts
// insertUser({username: 'test', password: 'test'}, (data) => console.log(data));
// insertUser({username: 'test2', password: 'test2'}, (data) => console.log(data));
// selectUser ({username:'test'}, (data) => console.log(data));
// checkLogin({username: 'test', password: 'test'}, (data) => console.log(data));
// insertFriendRequest({sender:'test', receiver:'test2'}, (data) => console.log(data));
// updateFriendRequest({wasAccepted: true, sender:'test', receiver:'test2'}, (data) => console.log(data));
// insertMessage({sender:'test', receiver:'test2', message: 'this is a test?'}, (data) => console.log(data));

module.exports = {
  insertUser: insertUser,
  selectUser: selectUser,
  checkLogin: checkLogin,
  insertFriendRequest: insertFriendRequest,
  updateFriendRequest:updateFriendRequest,
  insertMessage: insertMessage
}