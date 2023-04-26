const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456",
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Popperndieck",
        "number": "39-23-6423122"
    }
];

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const person = persons.find((elem) => elem.id === Number(req.params.id));
    if(person) res.json(person);
    else res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((elem) => elem.id !== id);
    res.send('If that id existed...it doesn\'t anymore');
});

app.post("/api/persons", (req, res) => {
    const body = req.body;

    if(!body.name) return res.status(400).json({error: 'missing name'});
    if(!body.number) return res.status(400).json({error: 'Missing number'});
    if(persons.find((person) => person.name === body.name)) return res.status(400).json({error: 'name must be unique'});

    const id = Math.trunc(Math.random() * 1000);

    const newPerson = {
        "name": body.name,
        "number": body.number,
        "id": id,
    };

    persons = persons.concat(newPerson);
    res.json(newPerson);
});

app.get('/info', (req, res) => {
    const responseHTML = `
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </div
        `;
    res.send(responseHTML);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
