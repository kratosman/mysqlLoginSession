const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Benjiesilvano14300101',
    database: 'test_wallet',
    port: 3333
}) 

conn.connect((err) => {
    if (err) {
      console.log('Database connection failed:', err);
    } else {
      console.log('Database connection established');
    }
  });
  
module.exports  = conn;