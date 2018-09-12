import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    const target = e.target.id
    this.setState({[target]: this.state[target] + 1})
  }

  render() {
    return (
      <div>
        <h1>anna palautetta</h1>
        <div>
          <button onClick={this.handleOnClick} id="good">hyvä</button>
          <button onClick={this.handleOnClick} id="neutral">neutraali</button>
          <button onClick={this.handleOnClick} id="bad">huono</button>
        </div>

        <h2>statistiikka</h2>
        <div>
          {`hyvä ${this.state.good}`}
        </div>
        <div>
          {`neutraali ${this.state.neutral}`}
        </div>
        <div>
          {`huono ${this.state.bad}`}
        </div>
        <div>
          {`keskiarvo ${(((this.state.good - this.state.bad) / (this.state.good + this.state.neutral + this.state.bad)) || 0).toFixed(1)}`}
        </div>
        <div>
          {`positiivisia ${(((this.state.good / (this.state.good + this.state.neutral + this.state.bad))*100) || 0).toFixed(1)} %`}
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
