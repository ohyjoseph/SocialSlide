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
  let queryString = 'SELECT username, avatarUrl FROM tblUsers WHERE username = $1';
  client.query(queryString, [params.username], (err, result) => {
    if (err) {
      console.error('ERROR selecting DMs:', err);
    }
    if (result.rowCount < 1) {
      console.error('User does NOT exist');
    }
    cb(err, result.rows);
  });
}

function selectFriendRequests (params, cb) {
  let queryString = 'SELECT * FROM tblFriends WHERE receiver = $1 AND wasAccepted IS null ORDER BY createdAt';
  client.query(queryString, [params.receiver], (err, result) => {
    if (err) {
      console.error('ERROR selecting friend requests:', err);
    }
    cb(err, result.rows);
  });
}

function selectFriends (params, cb) {
  let queryString = "SELECT * FROM tblFriends WHERE (receiver = $1 or sender = $1) AND wasAccepted = 't' ORDER BY createdAt";
  client.query(queryString, [params.username], (err, result) => {
    if (err) {
      console.error('ERROR selecting friends:', err);
    }
    cb(err, result.rows);
  });
}

function selectDms (params, cb) {
  let queryString = 'SELECT sender, receiver, message, createdAt FROM tblDms WHERE (sender = $1 AND receiver = $2) OR (sender = $2 AND receiver = $1) ORDER BY dmId;';
  client.query(queryString, [params.sender, params.receiver], (err, result) => {
    if (err) {
      console.error('ERROR selecting user:', err);
    }
    cb(err, result.rows);
  });
}

function checkLogin (params, cb) {
  let queryString = 'SELECT username, avatarUrl FROM tblUsers WHERE username = $1 AND password = $2'; 
  client.query(queryString, [params.username, params.password], (err, result) => {
    if (err) {
      console.error('ERROR checking login:', err);
    }
    if (result.rowCount < 1) {
      console.error('NOT a correct username and password');
    }
    cb(err, result.rows);
  });
}

function insertUser (params, cb) {
  if (!params.avatarUrl || params.avatarUrl === '') {
    params.avatarUrl = null;
  }

  let queryString = 'INSERT INTO tblUsers (username, password, avatarUrl) VALUES ($1, $2, $3)';
  client.query(queryString, [params.username, params.password, params.avatarUrl], (err, result) => {
    if (err) {
      console.error('ERROR inserting user:', err);
    }
    cb(err, result);
  });
}

function insertMessage (params, cb) {
  let queryString = 'INSERT INTO tblDms (sender, receiver, message) VALUES ($1, $2, $3)';
  client.query(queryString, [params.sender, params.receiver, params.message], (err, result) => {
    if (err) {
      console.error('ERROR inserting message:', err);
    }
    cb(err, result);
  });
}

function insertFriendRequest (params, cb) {
  if (params.sender === params.receiver) {
    cb('ERROR cannot send request to yourself');
    return;
  }
  let queryString = 'INSERT INTO tblFriends (sender, receiver) VALUES ($1, $2)';
  client.query(queryString, [params.sender, params.receiver], (err, result) => {
    if (err) {
      console.error('ERROR inserting friend request:', err);
    }
    cb(err, result);
  });
}

function updateFriendRequest (params, cb) {
  let queryString = 'UPDATE tblFriends set wasAccepted = $1 WHERE sender = $2 AND receiver = $3';
  client.query(queryString, [params.wasAccepted, params.sender, params.receiver], (err, result) => {
    if (err) {
      console.error('ERROR updating friend request:', err);
    }
    cb(err, result);
  });
}

//Database method test scripts
// let log = (data) => console.log(data);
// insertUser({username: 'test', password: 'test'}, log);
// insertUser({username: 'test2', password: 'test2'}, log);
// insertUser({username: 'test3', password: 'test3'}, log);
// insertUser({username: 'test4', password: 'test4'}, log);
// insertUser({username: 'test5', password: 'test5'}, log);
// insertUser({username: 'test6', password: 'test6'}, log);
// checkLogin({username: 'test', password: 'test'}, log);
// insertFriendRequest({sender:'test2', receiver:'test'}, log);
// updateFriendRequest({wasAccepted: true, sender:'test2', receiver:'test'}, log);
// insertFriendRequest({sender:'test3', receiver:'test'}, log);
// insertFriendRequest({sender:'test4', receiver:'test'}, log);
// insertFriendRequest({sender:'test5', receiver:'test'}, log);
// insertFriendRequest({sender:'test6', receiver:'test'}, log);
// insertMessage({sender:'test', receiver:'test2', message: '1st message'}, log);
// insertMessage({sender:'test', receiver:'test2', message: '2nd message'}, log);
// insertMessage({sender:'test2', receiver:'test', message: '3rd message'}, log);
// insertMessage({sender:'test2', receiver:'test3', message: 'Should NOT show up'}, log);
// selectUser({username:'test'}, log);
// selectDms({sender:'test', receiver: 'test2'}, log);
// selectFriendRequests({receiver: 'test'}, log); 
// selectFriends({receiver: 'test'}, log); 

module.exports = {
  insertUser: insertUser,
  selectUser: selectUser,
  selectDms: selectDms,
  selectFriendRequests: selectFriendRequests,
  selectFriends: selectFriends,
  checkLogin: checkLogin,
  insertFriendRequest: insertFriendRequest,
  updateFriendRequest:updateFriendRequest,
  insertMessage: insertMessage
}