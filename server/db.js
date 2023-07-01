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
console.log(process.env.SUP_USER,process.env.SUP_HOST,process.env.SUP_PASSWORD,process.env.SUP_PORT,process.env.SUP_USER)
const supabase = new Client({
    user: process.env.SUP_USER,
    host: process.env.SUP_HOST,
    password: process.env.SUP_PASSWORD,
    port:process.env.SUP_PORT,
    database: process.env.SUP_USER,
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