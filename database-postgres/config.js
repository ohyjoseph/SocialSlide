//$ service postgresql start
//$ PGPASSWORD=mypassword pg_dump -Fc --no-acl --no-owner -h localhost -U myuser mydb > mydb.dump
//$ heroku pg:backups:restore 'https://s3.amazonaws.com/ohslidebucket/slidedb.dump' DATABASE_URL
module.exports.localPsqlConString = 'postgres://oh:2112@localhost/slidedb';