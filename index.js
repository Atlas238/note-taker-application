const express = require('express');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

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

app.delete('/api/notes/:id', (req, res) => {

    console.log(`${req.method} request recieved...`)
    const recievedId = req.params;

    if (recievedId.id.length > 0) {
        
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            // dataParsed is an array of JSON objects....
            let dataParsed = JSON.parse(data)

            dataParsed.forEach(note => {
                if (note.id === recievedId.id) {
                    // console.log(dataParsed.indexOf(note));
                    dataParsed.splice(dataParsed.indexOf(note), 1);
                };

                const newData = JSON.stringify(dataParsed);
                // console.log(newData)
                fs.writeFile('./db/db.json', newData, (err) => {
                console.log('Database Updated');
                })
            });

        res.send('Delete request processed and confirmed!');

        });
    };
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));