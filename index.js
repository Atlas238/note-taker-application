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
    const data = fs.readFile('./db/db.json')
    for (let i = 0; i < data.length; i++) {
        res.json(data[i]);
    }
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));