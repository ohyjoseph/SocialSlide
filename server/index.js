const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-postgres');
const session = require('express-session');
const utility = require('./utility');

const app = express();

//Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next){
  console.log(`Serving ${req.method} on ${req.url}`)
  next();
});

// Sets location for client pages
app.use(express.static(__dirname + '/../react-client/dist'));

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
})

// app.get('/login', function (req, res) {
//   res.render('login');
// });

// app.post('/login', function (req, res) {
//   setHeader(res);
//   console.log(req.body);
//   res.send('asdf')
// });

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});