const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3001;
const URL = 'http://localhost';

app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin', `${URL}:3000`);
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    if ('OPTIONS' === req.method) return res.sendStatus(200);

    next();
});

var persons = [
    {
        "name": "Arto Hellan",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
];

const generateId = () => {
    const maxId = persons.length > 0
        ? persons.map(n => n.id).sort((a,b) => a - b).reverse()[0]
        : 1
    return maxId + 1
};

app.get('/info', (req, res) => {
    res.send(`
        <p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
        <p>${Date().toString()}</p>
    `);
});

app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.post('/api/persons', (req, res) => {
    persons.push({...req.body, id: generateId()});
    res.sendStatus(200);
});

app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const updatedPerson = req.body;
    persons = persons.map(person => person.id === id
        ? updatedPerson
        : person
    );
    res.sendStatus(200);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
