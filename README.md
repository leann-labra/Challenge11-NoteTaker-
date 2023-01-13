# Challenge11-NoteTaker-
This project is designed for building a note taking program using express.js skills

<!-- //creating api routes for the notes page 
app.get('/api/notes', (req, res) => {
    // .slice method returns a shallow copy of array into new array object
    res.json(db.slice(1));
    console.log("node made!");
})
//posting api notes for making new notes
app.post('/api/notes', (req, res) => {
    const madeNote = makeNote(req.body, db);
    res.json(madeNote);
})
 
const makeNote = (body, notesArray) => {
    const makeNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    if(notesArray.length === 0)
        notesArray.push(0);

    <!-- body.id = notesArray.length;
    notesArray[0]++;
    notesArray.push(madeNote);

    fs.writeFileSync(
        path.join(_dirname, './db/db/json'),
        JSON.stringify(notesArray, null, 2)
    );
    return makeNote();
}; -->
// API routes for notes page -->
