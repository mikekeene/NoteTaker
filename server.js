const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const { notes } = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// API ROUTES: 
//route to get the notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

//route to add a note
app.post('/api/notes', (req, res) => {
    let addNote = req.body;
    addNote.id = (notes.length + 1) + 1; //gives note unique id
    notes.push(addNote);

    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), (error) => {
        if (error) throw error;
    });
    res.json(addNote);
});
//route to delete a note

// HTML ROUTES: 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


