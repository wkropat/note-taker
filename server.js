
// First import everything needed
const express = require("express");
const app = express();
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const PORT = 3000;

// Add in the middleware

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Create HTML routes

app.get("/", (req,res)=> {
    // GET / should return index.html file
    // Question for the grader:
    // Do I need this if I'm doing the same thing below with the app.get /* ?
    res.sendFile(path.join(__dirname,`./public/index.html`));
});

app.get("/notes",  (req,res)=>{
    // GET /notes should return the notes.html file.
    res.sendFile(path.join(__dirname,`./public/notes.html`));
});

// GET * should return the index.html file. Catchall function to return to index.html. Put last??
app.get('/*', (req,res) => {
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

    // POST /api/notes should receive a new note to save on the request body, 

    // add it to the db.json file,

    // and then return the new note to the client
});

// Have to listen in to the port
app.listen(PORT, () => {
    console.log(`Smooth vibes coming through ${PORT}`);
});