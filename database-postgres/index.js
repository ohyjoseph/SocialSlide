const pg = require('pg');

var conString = 'postgres://oh:2112@localhost/slidedb';

let client = new pg.Client(conString);
client.connect((err) => {
  if (err) {
    return console.error('ERROR connecting to postgres:', err);
  }
  return console.log('CONNECTED to postgres slidedb!');
});

 function selectUser (params, cb) {
  client.query('SELECT * FROM tblUsers WHERE username = $1', [params.username], (err, result) => {
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
  client.query('SELECT * FROM tblUsers WHERE username = $1 AND password = $2', [params.username, params.password], (err, result) => {
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
  client.query('INSERT INTO tblUsers (username, password, avatarUrl) VALUES ($1, $2, $3)', [params.username, params.password, params.avatarUrl], (err, result) => {
    if (err) {
      return console.error('ERROR inserting user:', err);
    }
    cb(result);
  });
}

function insertMessage (params, cb) {
  client.query('INSERT INTO tblDms (sender, receiver, message) VALUES ($1, $2, $3)', [params.sender, params.receiver, params.message], (err, result) => {
    if (err) {
      return console.error('ERROR inserting message:', err);
    }
    cb(result);
  });
}

function insertFriendRequest (params, cb) {
  client.query('INSERT INTO tblFriends (sender, receiver) VALUES ($1, $2)', [params.sender, params.receiver], (err, result) => {
    if (err) {
      return console.error('ERROR inserting friend request:', err);
    }
    cb(result);
  });
}

// selectUser ({username:'test'}, (data) => console.log(data));
// checkLogin({username: 'test8', password: 'test5'}, (data) => console.log(data));
// insertMessage({sender:'test', receiver:'test3', message: 'pizza tastes really good?'}, (data) => console.log(data));
insertFriendRequest({sender:'test3', receiver:'test2'}, (data) => console.log(data));
module.exports.client = client;