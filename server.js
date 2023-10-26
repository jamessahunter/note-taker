const express = require('express');
const jsonData = require('./db/db.json')
const PORT = 3000;

const app=express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'/public/index.html')));

app.get('/api/notes',(req,res)=>{
    res.json(jsonData);
})

app.post('/api/notes',(req,res)=>{
    console.log(`body: ${req.body}`)
    res.json(response);
})


app.listen(PORT,()=>
    console.log(`Listening on port at http://localhost:${PORT}!`)
)