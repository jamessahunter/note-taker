const notes=require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notes.get('/',(req,res)=>{
    fs.readFile('./db/db.json','utf-8',(err,data)=>{
        if (err){
            console.log(err);
        }
        else{
            res.json(JSON.parse(data));
        }
    })
})

notes.post('/',(req,res)=>{
    // console.log(`body: ${req.body}`)
    const {title, text} =req.body;
    if(title&&text){
        const newNote={
            title,
            text,
            id:uuidv4(),
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
  
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
})

notes.delete('/:id',(req,res)=>{
    console.log(req.params);
    console.log(req.body);
    if(req.params.id){
        // console.log(req.params.uuid);
        const id=req.params.id;
        console.log(id);
        fs.readFile('./db/db.json','utf-8',(err,data)=>{
            if (err){
                console.log(err);
            }
            else{
                const parsedNotes=JSON.parse(data);
                const result=parsedNotes.filter((notes) => notes.id!==id)
    
                fs.writeFile('./db/db.json',JSON.stringify(result,null,4),(writeErr)=>
                writeErr ? console.error(writeErr) : console.info("successfully deleted note"));
                res.json(`Note ${id} has been deleted`)
            }

        })   
    }
})

module.exports=notes;