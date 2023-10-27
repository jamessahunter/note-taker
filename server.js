//imports dependencies
const express = require('express');
const path = require('path');
// calls routes
const api =require('./routes/index.js');
//sets port
const PORT = process.env.PORT || 3000;
//
const app=express();
//sets middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//points to all endpoints with /api
app.use('/api',api);

//sets route for main site
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'/public/index.html')));
//sets route for /notes
app.get('/notes',(req,res)=>res.sendFile(path.join(__dirname,'/public/notes.html')))
//sets route for any nonexistant routes
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/public/index.html')))

//tells server what port to listen on
app.listen(PORT,()=>
    console.log(`Listening on port at http://localhost:${PORT}!`)
)