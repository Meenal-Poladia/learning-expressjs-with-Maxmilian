/* For connecting mysql with server
const mysql = require("mysql2");

const pool =mysql.createPool({
    host: "localhost",
    user: "root",
    database: "node-complete",
    password: "mysqlroot"
})

module.exports = pool.promise();
*/

const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "mysqlroot", {
    dialect: "mysql",
    host: "localhost"
})

module.exports = sequelize;
