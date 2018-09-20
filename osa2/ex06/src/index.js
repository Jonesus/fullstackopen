import React from 'react';
import ReactDOM from 'react-dom';

const NumeroLista = ({tyypit, filtteri}) => (
  <React.Fragment>
    <h2>Numerot</h2>
    {tyypit.map(person =>
      person.name.toLowerCase().includes(filtteri.toLowerCase()) &&
        <div key={person.name}>{person.name} {person.number}</div>)
    }
  </React.Fragment>
);

const NumeroFormi = ({submitCallback, name, nameCallback, number, numberCallback}) => (
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
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' },
      ],
      newName: '',
      newNumber: '',
      filter: '',
    }
    this.submit = this.submit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  submit(event) {
    event.preventDefault();
    if (this.state.persons.some(person => person.name === this.state.newName)) {
      alert('No duplicates!');
    } else {
      this.setState({ persons:
        [...this.state.persons, {
          name: this.state.newName,
          number: this.state.newNumber,
        }]
      })
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

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterChange}/>

        <NumeroFormi
          submitCallback={this.submit}
          name={this.state.newName}
          nameCallback={this.handleNameChange}
          number={this.state.newNumber}
          numberCallback={this.handleNumberChange}
        />

        <NumeroLista tyypit={this.state.persons} filtteri={this.state.filter} />
      </div>
    )
  }
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
