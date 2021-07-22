const express = require('express');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    console.log(`${req.method} Request recieved to main page...`);
});

app.get('/notes', (req, res) => {
    console.log(`${req.method} recieved for Notes Page`);
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request to API recieved for notes`);
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uniqid();
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        let currentNotes = JSON.parse(data)
        currentNotes.push(newNote)
        fs.writeFile('./db/db.json', JSON.stringify(currentNotes), err => console.log(err));
    })
    res.send('Recieved Note Add call..');
});

app.delete('/api/notes', (req, res) => {
    
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));