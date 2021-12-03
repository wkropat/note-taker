const express = require('express');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require("./public/middleware/fsUtils");
const notesDb = require('./db/db.json');

// Middleware

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// I should use there routes instead:

// const notes = require('./routes/noteRoutes');
// app.use('/notes',notes);

// const api = require('./routes/apiRoutes');
// app.use('/api/notes',api);

// Heroku-friendly PORT 
const PORT = process.env.PORT || 3001;

// Create HTML routes

app.get("/", (req,res)=> {
    // GET / should return index.html file.
    res.sendFile(path.join(__dirname,`./public/index.html`));
});

app.get("/notes",  (req,res)=>{
    // GET /notes should return the notes.html file.
    res.sendFile(path.join(__dirname,`./public/notes.html`));
});

// Create API routes

app.get("/api/notes",(req,res)=>{
    //  Return all saved notes saved as JSON
    readFromFile("./db/db.json").then((data) => {
        noteData = JSON.parse(data);
        res.json(noteData);
      });
});

// API Post route 

app.post("/api/notes", (req,res)=>{ 
    // POST /api/notes should receive a new note to save on the request body, 
    // Make a new note using request
    const { title, text } = req.body;
    const newNote = { title, text,  id: uuidv4()};
    const noteString = JSON.stringify(newNote);
    readAndAppend(newNote, './db/db.json')
    // fs.writeFile(`./db/db.json`, notesDb, (err) =>
    //   err ? console.error(err) : console.log("success")
    // );
    res.status(201).json(newNote);
    
});

// API Delete Route

app.delete(`/api/notes/:id`, (req, res) => {
    const { id } = req.params
    readFromFile('./db/db.json').then((data) => {
        data = JSON.parse(data)
        const newNote = data.filter(data => data.id !== id)
        writeToFile('./db/db.json', newNote)
    }).then(getAndRenderNotes());
})

// Have to listen in to the port
app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
});