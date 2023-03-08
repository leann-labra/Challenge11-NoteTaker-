//loading express and fs package
const express = require("express");
const fs = require("fs");
const path = require("path");

//importing database
const db = require("./db/db.json");

//importing helpers
const uuid = require("./helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./helpers/fsUtils");

var app = express();
//will be using port environment 3000
var PORT = process.env.PORT || 3000;

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

//------- API routes for notes page --------//

//GET route for reading db.json files, and return all saved notes as json file
app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST route for note to send to database
app.post("/api/notes", (req, res) => {
  //destructuring assignment for items in req.body
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    //using helper to create a note-id per new note
    note_id: uuid(),
  };

  const saveNote = createNote(newNote);
  res.json(saveNote);
});
// creating a notes array to save into a database
const createNote = (newNote) => {
  const note = newNote;
  const notesArray = [];
  notesArray.push(note);
  // writing new note and sending it to database
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
};

app.delete("/api/notes/:note_id", (req, res) => {
  deletedNote(req.params.id, db);
  console.log("DELETE request for this note");
});

//looping through note database
const deletedNote = (note_id) => {
  const notesArray = readFromFile("./db/db.json");
  for (let i = 0; i < notesArray.length; i++) {
    let note_id = notesArray[i];
    if (note_id == req.params.id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(_dirname, "./db/db.json"),
        JSON.stringify(db, null, 2)
      );
      return;
    }
  }
};

//----- telling app to listen to to local host 3001 -------//
app.listen(PORT, () => console.log(`app listening on http//localhost:${PORT}`));
