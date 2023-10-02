const mysql = require("mysql2");
const config = require("./config");

// Configuración de la base de datos
const dbconfig = {
    host: 'localhost',
    user: 'root',
    password: 'foo',
    database: 'test2',
    port: 33061
  };


const pool = mysql.createPool(dbconfig);

module.exports = {
    pool
  };
