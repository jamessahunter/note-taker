const express = require('express');
const path = require('path');

const api =require('./routes/index.js');
const PORT = 3000;

const app=express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',api);

app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'/public/index.html')));

app.get('/notes',(req,res)=>res.sendFile(path.join(__dirname,'/public/notes.html')))

app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/public/index.html')))

app.listen(PORT,()=>
    console.log(`Listening on port at http://localhost:${PORT}!`)
)