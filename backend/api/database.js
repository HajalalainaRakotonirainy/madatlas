const Pool = require('pg').Pool;
const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const pool = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    port : DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
});

pool.connect((error)=>{
    if(error) throw error
    console.log('Database connected');
})

module.exports = pool;