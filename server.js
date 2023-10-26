const express = require('express');
const path = require('path');
const fs = require('fs');
const jsonData = require('./db/db.json');
const PORT = 3000;

const app=express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'/public/index.html')));

app.get('/notes',(req,res)=>res.sendFile(path.join(__dirname,'/public/notes.html')))

app.get('/api/notes',(req,res)=>{
    res.json(jsonData);
})

app.post('/api/notes',(req,res)=>{
    // console.log(`body: ${req.body}`)
    const {title, text} =req.body;
    if(title&&text){
        const newNote={
            title,
            text,
        };
    console.log(newNote);
    

    fs.readFile('./db/db.json','utf-8',(err,data)=>{
        if (err){
            console.log(err);
        }
        else{
            const parsedNotes=JSON.parse(data);
            parsedNotes.push(newNote);
            
            fs.writeFile('./db/db.json',JSON.stringify(parsedNotes,null,4),(writeErr)=>
            writeErr ? console.error(writeErr) : console.info("successfully added note"));
        }
    })
    const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(newNote);
    } else {
      res.json('Error in posting note');
    }
})


app.listen(PORT,()=>
    console.log(`Listening on port at http://localhost:${PORT}!`)
)