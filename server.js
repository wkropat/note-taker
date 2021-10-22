// First import everything needed
const express = require("express");
const app = express();
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const { randomUUID } = require("crypto");
// const { text } = require("express");

// Heroku-friendly PORT
const PORT = process.env.PORT || 3000;

// Add in the middleware

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Create HTML routes

app.get("/", (req,res)=> {
    // GET / should return index.html file.
    // Question for the grader:
    // Do I need this if I'm doing the same thing below with the app.get /* ?
    res.sendFile(path.join(__dirname,`./public/index.html`));
});

app.get("/notes",  (req,res)=>{
    // GET /notes should return the notes.html file.
    res.sendFile(path.join(__dirname,`./public/notes.html`));
});

app.get('/*', (req,res) => {
    // Catchall function to return to index.html. Put last.
    res.sendFile(path.join(__dirname,`./public/index.html`));
});

// Create API routes

app.get("/api/notes",(req,res)=>{
    //  Return all saved notes saved as JSON
    res.sendFile(path.join(__dirname,`./db/sb.json`));
});

// API Post route 

app.post("/api/notes", (req,res)=>{
    // Get UUID
    uuid = randomUUID();
    console.log(uuid);
    // POST /api/notes should receive a new note to save on the request body, 
    // Make a new note using request
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: uuid,
    }
    // add it to the db.json file,
    db.push(note);
    fs.writeFilesSync("./db/db.json", JSON.stringify(db,null,4));
    // and then return the new note to the client

    // Answer your questions.
    res.send("Note taken.");
});

// Have to listen in to the port
app.listen(PORT, () => {
    console.log(`Smooth vibes coming through http://localhost:${PORT}`);
});