const pg = require('pg');

var conString = 'postgres://oh:2112@localhost/slidedb';

let client = new pg.Client(conString);
client.connect((err) => {
  if (err) {
    return console.error('ERROR connecting to postgres:', err);
  }
  console.log('CONNECTED to postgres slidedb!');
});

client.query('SELECT * FROM tblUsers', (err, result) => {
  if (err) {
    return console.error('ERROR running query:', err);
  }
  console.log(result.rows);
});

// let client = pg.connection(conString, (err, client, done) => {
//   if (err) {
//     return console.error('ERROR connecting to Slide database:', err);
//   }
//   return client;
// });

// var selectAll = function(callback) {
//   connection.query('SELECT * FROM items', function(err, results, fields) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };
module.exports.client = client;