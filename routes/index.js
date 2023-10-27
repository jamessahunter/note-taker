//dependencies
const express = require('express');
const notesRouter=require('./notes.js');
const app = express();

//middle ware pointing to the notes.js file for all endpoints with /api/notes
app.use('/notes',notesRouter);

module.exports=app;