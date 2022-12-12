//loading express and fs package
const express = require('express');
const fs = require('fs');
const { builtinModules } = require('module');
const path = require('path');

//importing database
const db = require('./db/db.json');

var app = express();
//will be using port environment 3001 
var PORT = process.env.PORT || 3001;

//middleware to parse through data as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));

//on page load start with index.html (homepage)
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// //now getting path for notes.html (notes page)
// app.get("/notes", function (req, res) {
//     res.sendFile(path.join(__dirname, "/public/notes.html"))
// });

// //creating api routes for the notes page 
// app.get('/api/notes', (req, res) => {
//     // .slice method returns a shallow copy of array into new array object
//     res.json(db.slice(1));
//     console.log("node made!");
// })
// //posting api notes for making new notes
// app.post('/api/notes', (req, res) => {
//     const madeNote = makeNote(req.body, db);
//     res.json(madeNote);
// })
 
// const makeNote = (body, notesArray) => {
//     const makeNote = body;
//     if (!Array.isArray(notesArray))
//         notesArray = [];
//     if(notesArray.length === 0)
//         notesArray.push(0);

//     body.id = notesArray.length;
//     notesArray[0]++;
//     notesArray.push(madeNote);

//     fs.writeFileSync(
//         path.join(_dirname, './db/db/json'),
//         JSON.stringify(notesArray, null, 2)
//     );
//     return makeNote();
// };
// API routes for notes page

app.get('/api/notes', (req, res) => {
    res.json(dataBase.slice(1));
});

app.post('/api/notes', (req, res) => {
        const newNote = createNote(req.body, dataBase);
        res.json(newNote);
    })
    // Function to create new note and count ID for each note
const createNote = (body, notesArray) => {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray.length;
    notesArray[0]++;
    notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
};

//----- telling app to listen to to local host 3001 -------//
app.listen(PORT, () => console.log(`app listerning on http//localhost:${PORT}`));