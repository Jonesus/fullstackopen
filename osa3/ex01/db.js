const mongoose = require('mongoose');
require('dotenv').config();

// eslint-disable-next-line no-process-env
const DB_URL = process.env.DB_URL_DEV || process.env.DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true });

// eslint-disable-next-line
var personSchema = new mongoose.Schema({ name: String, number: String });

personSchema.statics.format = function (person) {
    return {
        id: person._id, // eslint-disable-line no-underscore-dangle
        name: person.name,
        number: person.number
    }
};

const Person = mongoose.model('Person', personSchema);

module.exports = { Person };
