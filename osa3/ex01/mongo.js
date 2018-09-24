const mongoose = require('mongoose');
const creds = require('./dbcreds');

const url = `mongodb://${creds.user}:${creds.pass}@ds113443.mlab.com:13443/best-phonebook`;

mongoose.connect(url, { useNewUrlParser: true });

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number,
});

if (process.argv.length < 4) {
    console.log('puhelinluettelo:');
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name + ' ' + person.number);
            })
            mongoose.connection.close()
        })
} else {
    const name = process.argv[2];
    const number = process.argv[3];

    console.log(`lisätään henkilö ${name} numero ${number} luetteloon`);

    const person = new Person({
      name,
      number,
      id: 1,
    })

    person
      .save()
      .then(response => {
        console.log('person saved!')
        mongoose.connection.close()
      })
}