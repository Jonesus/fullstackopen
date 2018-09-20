import React from 'react';
import ReactDOM from 'react-dom';

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
    event.preventDefault();
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

        <h2>Lisää uusi</h2>
        <form onSubmit={this.submit}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>
        {this.state.persons.map(person =>
          person.name.toLowerCase().includes(this.state.filter.toLowerCase()) &&
            <div key={person.name}>{person.name} {person.number}</div>
          )}
      </div>
    )
  }
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
