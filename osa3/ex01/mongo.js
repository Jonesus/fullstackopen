const mongoose = require('mongoose');
const creds = require('./dbcreds');

const url = `mongodb://${creds.user}:${creds.pass}@ds113443.mlab.com:13443/best-phonebook`;

mongoose.connect(url, { useNewUrlParser: true });

const Person = mongoose.model('Person', {
  id: Number,
  name: String,
  number: String
});

/* eslint-disable no-console */

if (process.argv.length < 4) {
    console.log('puhelinluettelo:');
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            })
            mongoose.connection.close()
        })
} else {
    const [, , name, number] = process.argv; // eslint-disable-line

    console.log(`lisätään henkilö ${name} numero ${number} luetteloon`);

    const person = new Person({
      id: 1,
      name,
      number
    })

    person
      .save()
      .then(() => {
        console.log('person saved!')
        mongoose.connection.close()
      })
}
