const mariadb = require('mariadb');
const { dbpasswd } = require("./token.json")
const { database: { dbhost, dbname, dbuser, dbport} } = require("./config.json")

const pool = mariadb.createPool({
    host: "localhost",
    port: 3306,
    user: dbuser,
    password: dbpasswd,
    database: dbname,
    connectionLimit: 10,
    ssl: false
});





async function deploy() {
let connection;


try{
    connection = await pool.getConnection();

    await connection.query(`CREATE TABLE IF NOT EXISTS message(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    message_id BIGINT NOT NULL,
    author VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    channel VARCHAR(20) NOT NULL,
    edited TINYINT UNSIGNED,
    deleted TINYINT(1) NOT NULL,
    date TEXT NOT NULL)`)

await connection.query(`CREATE TABLE IF NOT EXISTS warn(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user BIGINT NOT NULL,
    author VARCHAR(20) NOT NULL,  
    reason VARCHAR(100)
)`);

await connection.query(`CREATE TABLE IF NOT EXISTS mute(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user BIGINT NOT NULL,
    author VARCHAR(20) NOT NULL,
    reason VARCHAR(100)  
)`);

await connection.query(`CREATE TABLE IF NOT EXISTS kick(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user BIGINT NOT NULL,
    author VARCHAR(20) NOT NULL,
    reason VARCHAR(100) 
)`);

await connection.query(`CREATE TABLE IF NOT EXISTS ban(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user BIGINT NOT NULL,
    author VARCHAR(20) NOT NULL,
    reason VARCHAR(100) 
  )`);

await connection.query(`CREATE TABLE IF NOT EXISTS report(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user BIGINT NOT NULL,
    author VARCHAR(20) NOT NULL,
    reason VARCHAR(100) NOT NULL
    )`);

await connection.query(`CREATE TABLE IF NOT EXISTS XP(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user VARCHAR(20) UNIQUE,
    level INTEGER NOT NULL,
    xp INTEGER NOT NULL
    )`);

await connection.query(`CREATE TABLE IF NOT EXISTS money(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    user VARCHAR(20) UNIQUE,
    coin INTEGER NOT NULL
    )`);

await connection.query(`CREATE TABLE IF NOT EXISTS shop(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(20),
    description VARCHAR(250),
    price INTEGER,
    supply INTEGER,
    rarity INTEGER,
    icon VARCHAR(40)
    )`)


    console.log("MariaDB was deployed with succes");

} catch (err) {
    console.error("Erreur MariaDB: " + err);
    process.exit(1);
} finally {
    if (connection) connection.release();
}
process.exit(0);
}
deploy();
