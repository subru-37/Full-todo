const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const cors = require('cors');
const {v4: uuidv4} = require('uuid');
app.use(cors({
    'allowedHeaders': ['Content-Type'],
    'origin': '*',
    'preflightContinue': true
  }))
app.get('/', (req,res)=>{
    res.send("Hello")
})
const pool = require('./db');
app.use(express.json())
//get 
// console.log('haha')
app.get('/todos/:userEmail',async (req,res)=>{
    const {userEmail} = req.params;
    try{   
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1;',[userEmail]);
        res.json(todos.rows)
    }   

    catch(err){
        console.log(err)
    }
})
app.post('/todos', async (req,res)=>{
    const {user_email, title, progress, date} = req.body;
    const id = uuidv4();
    try{
        const toDo = await pool.query(`INSERT INTO todos(id,user_email, title, progress, date) VALUES($1,$2,$3,$4,$5);`,[id,user_email, title, progress, date] );
        console.log(id,user_email, title, progress, date)
        res.json(toDo)
    }catch(err){
        console.log(err)
    }
})
app.put('/todos/:id', async (req,res)=>{
    const {id} = req.params;
    const {user_email, title, progress, date} = req.body;
    try{
        const editTodo = await pool.query(`UPDATE todos SET user_email = $1, title = $2, progress = $3, date=$4 WHERE id=$5;`,[user_email,title,progress,date,id])
        res.json(editTodo);
    }
    catch(err){
        console.log(err)
    }
})
app.delete('/todos/:id', async (req,res)=>{
    const {id} = req.params;
    console.log(id)
    try{
        const deleteTodo = await pool.query(`DELETE FROM todos WHERE id = $1;`,[id]);
        res.json(deleteTodo);
    }
    catch(err){
        console.log(err)
    }
})
app.listen(PORT, ()=> console.log(`port running on ${PORT}`))