require("dotenv").config();

const { Pool, Client } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});
pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
  console.log("Pool Query Working");
  pool.end()
});

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  console.log("Client Query Working");
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
  client.end();
});