const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    res.json('?')
})

app.post('/api/notes', (req, res) => {
    const currentData = JSON.stringify(fs.readFile('./db/db.json'));
    fs.writeFile('./db/db.json', JSON.parse(currentData.push(req)), (err) => {
        console.error(err);
    })

})

app.delete('/api/notes/:id', (req, res) => {

})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));