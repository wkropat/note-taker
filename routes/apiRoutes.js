const express = require("express");
const api = express.Router();
const fs = require('fs');
const notesDb = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

api.get('/', (req,res) => {
    res.json(notesDb);
});

api.post("/notes", (req, res) => {
   const { title, text } = req.body;
   const newNote = { title, text, id: uuidv4() };
   noteData.push(newNote);
   const noteString = JSON.stringify(noteData);
   fs.writeFile(`./db/db.json`, noteString, (err) =>
     err ? console.error(err) : console.log("success")
   );
   res.status(201).json(newNote);
 });


module.exports = api;