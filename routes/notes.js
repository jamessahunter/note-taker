//dependencies
const notes=require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//get route for api/notes
notes.get('/',(req,res)=>{
    //reads in data from db.json
    fs.readFile('./db/db.json','utf-8',(err,data)=>{
        //console logs if error
        if (err){
            console.log(err);
        }
        //returns the data in json format
        else{
            res.json(JSON.parse(data));
        }
    })
})
//post route for api/notes
notes.post('/',(req,res)=>{
    //destructures object 
    const {title, text} =req.body;
    //checks the body has contents
    if(title&&text){
        //creates newnote 
        const newNote={
            title,
            text,
            id:uuidv4(),
        };
        //reads the db.json file
    fs.readFile('./db/db.json','utf-8',(err,data)=>{
        if (err){
            console.log(err);
        }
        else{
            //push the new note to the array of notes
            const parsedNotes=JSON.parse(data);
            parsedNotes.push(newNote);
            //writes the array back to the db.json file
            fs.writeFile('./db/db.json',JSON.stringify(parsedNotes,null,4),(writeErr)=>
            writeErr ? console.error(writeErr) : console.info("successfully added note"));
        }
    })
    //returns the response if complete else logs the error
    const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
})
//delete route for api/notes/:id
notes.delete('/:id',(req,res)=>{
    //checks that there is an id
    if(req.params.id){
        //gets the id
        const id=req.params.id;
        //reads in the db.json file
        fs.readFile('./db/db.json','utf-8',(err,data)=>{
            if (err){
                console.log(err);
            }
            else{
                //filters out the note with that specific id
                const parsedNotes=JSON.parse(data);
                const result=parsedNotes.filter((notes) => notes.id!==id)
                //wrtites the result back to the db.json file
                fs.writeFile('./db/db.json',JSON.stringify(result,null,4),(writeErr)=>
                writeErr ? console.error(writeErr) : console.info("successfully deleted note"));
                res.json(`Note ${id} has been deleted`)
            }

        })   
    }
})
//exports the notes file
module.exports=notes;