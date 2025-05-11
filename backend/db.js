const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "1224",
    host: "localhost",
    port: 5432,
    database: "demo"
})

module.exports = pool