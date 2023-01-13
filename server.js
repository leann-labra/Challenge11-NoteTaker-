//loading express and fs package
const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");

//importing database
const db = require("./db/db.json");

//importing helpers
const uuid = require("./helpers/uuid");
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");

var app = express();
//will be using port environment 3001
var PORT = process.env.PORT || 3001;

//middleware to parse through data as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//on page load start with index.html (homepage)
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//now getting path for notes.html (notes page)
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//GET route for reading db.json files, and return all saved notes as json file
app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});
//POST route for note to send to database
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      //using helper to create a note-id per new note
      note_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("New Note!!");
  } else {
    res.error("Note not saved :(");
  }
});



//----- telling app to listen to to local host 3001 -------//
app.listen(PORT, () => console.log(`app listening on http//localhost:${PORT}`));
