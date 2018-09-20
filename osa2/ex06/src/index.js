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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
    }
    this.submit = this.submit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
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
      }
    } else {
      const newPerson = {
        name: this.state.newName,
        number: this.state.newNumber,
      };
      post(newPerson)
        .then(get().then(response => this.setState({persons: response.data})));
    }
    this.setState({ newName: '', newNumber: '' }) ;
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
    del(id);
    this.setState({persons: this.state.persons.filter(
      person => person.id !== id
    )});
  }

  handleChange(id, newPerson) {
    put(id, newPerson);
    this.setState({persons: [...this.state.persons.filter(
      person => person.id !== id
    ), newPerson]});
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
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
