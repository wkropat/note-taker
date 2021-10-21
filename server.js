
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

// The following HTML routes should be created:

// GET /notes should return the notes.html file.
app.get("/", (req,res)=> {
    res.sendFile(path.join(__dirname,`./public/index.html`));
});

app.get("/notes",  (req,res)=>{
    res.sendFile(path.join(__dirname,`./public/index.html`));
});
// The following API routes should be created:
// GET /api/notes should read the db.json file and return all saved notes as JSON.

app.get("/api/notes",(req,res)=>{

    res.sendFile(path.join(__dirname,`./public/index.html`));
});

// GET * should return the index.html file. Catchall function to return to index.html Put last??
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post("/", (req,res)=>{
});

// Have to listen in to the port

app.listen(PORT, () => {
    console.log(`Smooth vibes coming through ${PORT}`);
});