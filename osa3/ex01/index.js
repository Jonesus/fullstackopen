const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan');
const app = express();


const PORT = 3001;

morgan.token('body', function (req, res) { return JSON.stringify(req.body) || '{}' })

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors())
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));

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

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    res.json(persons.find(p => p.id === id))
});

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        res.status(400).send({ error: 'must have name and number!' })
    } else if (persons.some(p => p.name === req.body.name)) {
        res.status(400).send({ error: 'name must be unique!' })
    } else {
        persons.push({...req.body, id: generateId()});
        res.sendStatus(200);
    }
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
