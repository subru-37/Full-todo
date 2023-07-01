const Pool = require('pg').Pool;
require('dotenv').config()
// import {createClient} from '@supabase/supabase-js'
const { Client } = require('pg');
// const pool = new Pool({
//     user: 'postgres',
//     password: process.env.PASSWORD,
//     host: process.env.HOST,
//     port: process.env.DBPORT,
//     database: 'todoapp'
// })
// console.log(process.env.API_KEY)
const supabase = new Client({
    user: 'postgres',
    host: 'db.vthfmjwbxstaeeqtrqqu.supabase.co',
    password: 'SUBRUROCKS@a1',
    port:5432,
    database: 'postgres',
});
async function connectToDatabase() {
    try {
      await supabase.connect();
      console.log('Connected to PostgreSQL database!');
    } catch (error) {
      console.error('Error connecting to PostgreSQL:', error);
    }
  }
  
  connectToDatabase();
// module.exports = pool;
module.exports = supabase;