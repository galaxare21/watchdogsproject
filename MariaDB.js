

const MariaDB = require("mariadb")
const { dbpasswd } = require("./token.json")
const { database: { dbhost, dbname, dbuser, dbport } } = require("./config.json")

const pool = MariaDB.createPool({
    host: dbhost,
    port: dbport,
    user: dbuser,
    password: dbpasswd,
    database: dbname,
    connectionLimit: 10,
    bigIntAsNumber: true
});

module.exports = pool;