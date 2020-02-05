const pgp = require('pg-promise')();
const cn = 'postgress://localhost:5432/userlist'
const db = pgp(cn)

module.exports = db
