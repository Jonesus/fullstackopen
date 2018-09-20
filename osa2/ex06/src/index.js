import React from 'react';
import ReactDOM from 'react-dom';
import {get, post, del, put} from './api';

const NumeroLista = ({tyypit, filtteri, deleteCallback}) => (
  <React.Fragment>
    <h2>Numerot</h2>
    <table>
      <tbody>
        {tyypit.map(person =>
          person.name.toLowerCase().includes(filtteri.toLowerCase()) &&
            <tr key={person.name}>
              <th>{person.name}</th>
              <td>{person.number}</td>
              <td><button onClick={() => deleteCallback(person.id)}>poista</button></td>
            </tr>
        )}
      </tbody>
    </table>
  </React.Fragment>
);

const NumeroFormi = ({
  submitCallback,
  name,
  nameCallback,
  number,
  numberCallback,
}) => (
  <React.Fragment>
    <h2>Lisää uusi</h2>
    <form onSubmit={submitCallback}>
      <div>
        nimi: <input value={name} onChange={nameCallback}/>
      </div>
      <div>
        numero: <input value={number} onChange={numberCallback}/>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  </React.Fragment>
);

const Notification = ({message}) => (
  !!message
    ? <div style={{backgroundColor: 'green', padding: '20px', color: 'white'}}>{message}</div>
    : null
);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: '',
    }
    this.submit = this.submit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updatePeople = this.updatePeople.bind(this);
  }

  componentDidMount() {
    this.updatePeople();
  }

  updatePeople() {
    get().then(response => this.setState({persons: response.data}));
  }

  submit(event) {
    event.preventDefault();
    const duplicates = this.state.persons.filter(
      person => person.name === this.state.newName
    );
    if (duplicates.length !== 0) {
      if (window.confirm('update number?')) {
        this.handleChange(duplicates[0].id, {...duplicates[0], number: this.state.newNumber})
        this.notify(`päivitettiin ${duplicates[0].name} numero`);
      }
    } else {
      const newPerson = {
        name: this.state.newName,
        number: this.state.newNumber,
      };
      post(newPerson)
        .then(this.updatePeople);
      this.notify(`lisättiin ${this.state.newName}`);
    }
    this.setState({ newName: '', newNumber: '' });
  }

  handleNameChange(event) {
    this.setState({ newName: event.target.value });
  }

  handleNumberChange(event) {
    this.setState({ newNumber: event.target.value });
  }

  handleFilterChange(event) {
    this.setState({ filter: event.target.value });
  }

  handleDelete(id) {
    this.notify(`poistettiin ${this.state.persons.filter(p => p.id === id)[0].name}`);
    del(id);
    this.setState({persons: this.state.persons.filter(
      person => person.id !== id
    )});
  }

  handleChange(id, newPerson) {
    put(id, newPerson)
      .then(this.updatePeople)
      .catch(e => {
        this.notify('muutettavan henkilön tiedot poistettiin jo');
        this.updatePeople();
      });
  }

  notify(message) {
    this.setState({ notification: message });
    setTimeout(() => this.setState({ notification: '' }), 3000);
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.notification} />

        rajaa näytettäviä
        <input
          value={this.state.filter}
          onChange={this.handleFilterChange}
        />

        <NumeroFormi
          submitCallback={this.submit}
          name={this.state.newName}
          nameCallback={this.handleNameChange}
          number={this.state.newNumber}
          numberCallback={this.handleNumberChange}
        />

        <NumeroLista
          tyypit={this.state.persons}
          filtteri={this.state.filter}
          deleteCallback={this.handleDelete}
        />
      </div>
    )
  }
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
