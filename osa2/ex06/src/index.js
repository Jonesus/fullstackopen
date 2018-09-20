import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submit(event) {
    if (this.state.persons.some(person => person.name === this.state.newName)) {
      alert('No duplicates!');
    } else {
      this.setState({ persons: [...this.state.persons, {name: this.state.newName}]})
    }
    this.setState({ newName: '' }) ;
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ newName: event.target.value });
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.submit}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    )
  }
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
