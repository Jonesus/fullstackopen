const mongoose = require('mongoose');
const creds = require('./dbcreds');

const DB_URL = `mongodb://${creds.user}:${creds.pass}@ds113443.mlab.com:13443/best-phonebook`;

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
