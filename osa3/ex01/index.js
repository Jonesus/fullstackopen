const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan');
const { Person } = require('./db.js');

const app = express();

const PORT = 3001;

morgan.token('body', function (req, res) { return JSON.stringify(req.body) || '{}' })

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors())
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));

app.get('/info', (req, res) => {
    res.send(`
        <p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
        <p>${Date().toString()}</p>
    `);
});

app.get('/api/persons', (req, res) => Person
    .find({})
    .then(persons => res.json(persons.map(Person.format)))
    .catch(error => {
        console.log(error)
        response.status(404).end()
    })
);

app.get('/api/persons/:id', (req, res) => Person
    .findById(req.params.id)
    .then(person => res.json(Person.format(person)))
    .catch(error => {
        console.log(error)
        response.status(404).end()
    })
);

app.post('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        res.status(400).send({ error: 'must have name and number!' })
    }
    Person.find({name: req.body.name})
        .then(result => {
            if (result.length) {
                res.status(400).send({ error: 'name must be unique!' })
            } else {
                const person = new Person(req.body);
                person.save()
                    .then(savedPerson => res.json(Person.format(savedPerson)))
                    .catch(error => {
                        console.log(error)
                        response.status(404).end()
                    })
            }});
        });

app.put('/api/persons/:id', (req, res) => Person
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updated => res.json(Person.format(updated)))
    .catch(error => {
        console.log(error);
        res.status(400).send({ error: 'bad id' })
    })
);

app.delete('/api/persons/:id', (req, res) => Person
    .findByIdAndRemove(req.params.id)
    .then(result => res.status(204).send())
    .catch(error => res.status(400).send({ error: 'bad id'}))
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
