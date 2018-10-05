const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL_DEV || process.env.DB_URL;

mongoose.connect(DB_URL, { useNewUrlParser: true });

var personSchema = new mongoose.Schema({ name: String, number: String });

personSchema.statics.format = function(person) {
    return {
        name: person.name,
        number: person.number,
        id: person._id,
    }
};

const Person = mongoose.model('Person', personSchema);

module.exports = { Person };
