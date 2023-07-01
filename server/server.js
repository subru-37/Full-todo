const PORT = 8000;
const express = require('express');
const app = express();
const cors = require('cors');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
app.use(cors({
    'allowedHeaders': ['Content-Type'],
    'origin': '*',
    'preflightContinue': true
  }))
app.get('/', (req,res)=>{
    res.send("Hello")
})
// const pool = require('./db');
const supabase = require('./db');
app.use(express.json())
//get 
app.get('/todos/:userEmail',async (req,res)=>{
    const {userEmail} = req.params;
    try{   
        const todos = await supabase.query('SELECT * FROM todos WHERE user_email = $1;',[userEmail]);
        res.json(todos.rows)
    }   

    catch(err){
        console.log(err)
    }
})
async function random(user_email, title, progress, date,res,req){
    const id = Math.floor(Math.random()*10000);
    try{
        const toDo = await supabase.query(`INSERT INTO todos(id,user_email, title, progress, date) VALUES($1,$2,$3,$4,$5);`,[id,user_email, title, progress, date] );
        // console.log(id,user_email, title, progress, date)
        res.json(toDo)
    }catch(err){
        console.log(err)
        random()
    }
}
app.post('/todos', async (req,res)=>{
    const {user_email, title, progress, date} = req.body;    
    random(user_email, title, progress, date,res,req);
})
app.put('/todos/:id', async (req,res)=>{
    const {id} = req.params;
    const {user_email, title, progress, date} = req.body;
    try{
        const editTodo = await supabase.query(`UPDATE todos SET user_email = $1, title = $2, progress = $3, date=$4 WHERE id=$5;`,[user_email,title,progress,date,id])
        res.json(editTodo);
    }
    catch(err){
        console.log(err)
    }
})
app.delete('/todos/:id', async (req,res)=>{
    const {id} = req.params;
    try{
        const deleteTodo = await supabase.query(`DELETE FROM todos WHERE id = $1;`,[id]);
        res.json(deleteTodo);
    }
    catch(err){
        console.log(err)
    }
})
app.post('/signup',async (req,res)=>{
    const {email,password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashpass = bcrypt.hashSync(password,salt);
    try{
        const signup = await supabase.query(`INSERT INTO users (email,hashed_password) VALUES($1,$2)`,[email,hashpass]);
        const token = jwt.sign({email},'secret',{expiresIn:'1hr'});
        res.json({email,token})
    }catch(err){
        console.log(err)
        if(err){
            res.json({detail: err.detail})
        }
    }
})
app.post('/login',async (req,res)=>{
    const {email,password} = req.body;

    try{
        const users = await supabase.query('SELECT * FROM users WHERE EMAIL= $1',[email])
        if(!users.rows.length){
            return res.json({detail: 'User does not exist, please sign up'})
        }
        const success = await bcrypt.compare(password,users.rows[0].hashed_password);
        const token = jwt.sign({email},'secret',{expiresIn:'1hr'});
        if(success){
            res.json({'email': users.rows[0].email,token: token})
        }else{
            res.json({detail: 'login failed'})
        }
    }catch(err){
        console.log(err)
    }
})
app.listen(PORT, ()=> {
    console.log(`port running on ${PORT}`);
})