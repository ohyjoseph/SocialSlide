const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-postgres');
const session = require('express-session');
// const utility = require('./utility');

const app = express();

// Sets location for client pages
app.use(express.static(__dirname + '/../react-client/dist'));

//Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next){
  if (req.method === 'POST') {
    console.log(`POSTING to ${req.url} with ${JSON.stringify(req.body)}`);
  } else if (req.method === 'GET') {
    console.log(`GETTING ${req.url}`);
  } else {
    console.error('ERROR with server call');
  }
  next();
});

let log = (data) => console.log(data);

let setHeader = (res) => {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('access-control-allow-headers', 'content-type, accept');
  res.header('access-control-max-age', 10);
  res.set('Content-Type', 'application/json');
}

// For express-session
app.set('trust proxy', 1);
app.use(session({
  secret: 'slide',
  cookie: {}
}));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../react-client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.post('/login', function (req, res) {
  // setHeader(res);
  db.checkLogin({username: req.body.username, password: req.body.password}, (err, results) => {
    if (err) {
      console.log(err)
      res.send(err);
    }
    res.send(results);
  });
});

app.post('/signup', function (req, res) {
  // setHeader(res);
  db.insertUser({username: req.body.username, password: req.body.password, avatarUrl: req.body.avatarUrl}, (err, results) => {
    if (err) {
      console.log(err)
      res.send(err);
    }
    res.send(results);
  });
});

app.post('/friendrequest', function (req, res) {
  // setHeader(res);
  db.insertFriendRequest({sender: req.body.sender, receiver: req.body.receiver}, (err, results) => {
    if (err) {
      console.log(err)
      res.send(err);
    }
    res.send(results);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});