import React from 'react';
import ReactDOM from 'react-dom';

const API_URL = 'https://restcountries.eu/rest/v2/all';

const Countries = ({countries}) => (
  <React.Fragment>
    {countries.length > 10
      ? <div>too many maches, specify another filter</div>
      : countries.length === 1
        ? <Country country={countries[0]} />
        : countries.map(country =>
          <div key={country.name}>{country.name}</div>)
    }
  </React.Fragment>
);

const Country = ({country}) => (
  <React.Fragment>
    <h2>{country.name}</h2>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <img src={country.flag} />
  </React.Fragment>
);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allCountries: [],
      visibleCountries: [],
      filter: '',
    }
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.setState({allCountries: data}));
  }

  handleFilterChange(event) {
    this.setState({
      filter: event.target.value,
    });

    const countries = this.state.allCountries.filter(country =>
        country.name.toLowerCase().includes(event.target.value.toLowerCase()));

    this.setState({
      visibleCountries: countries,
    });
  }

  render() {
    return (
      <div>
        find countries: <input value={this.state.filter} onChange={this.handleFilterChange}/>

        <Countries countries={this.state.visibleCountries} />
      </div>
    )
  }
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
