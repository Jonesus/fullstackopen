import React from 'react'
import ReactDOM from 'react-dom'

const FeedbackButton = ({callback, id, children}) => (
  <button onClick={callback} id={id}>{children}</button>
);

const StatisticRow = ({children}) => (
  <div>{children}</div>
);

const Statistics = ({good, neutral, bad}) => (
  <div>
    {(good + neutral + bad) === 0 ? (
      <div>ei yhtään palautetta annettu</div>
    ) : (
      <React.Fragment>
        <StatisticRow>
          {`hyvä ${good}`}
        </StatisticRow>
        <StatisticRow>
          {`neutraali ${neutral}`}
        </StatisticRow>
        <StatisticRow>
          {`huono ${bad}`}
        </StatisticRow>
        <StatisticRow>
          {`keskiarvo ${(((good - bad) / (good + neutral + bad)) || 0).toFixed(1)}`}
        </StatisticRow>
        <StatisticRow>
          {`positiivisia ${(((good / (good + neutral + bad))*100) || 0).toFixed(1)} %`}
        </StatisticRow>
      </React.Fragment>
    )}
  </div>
);

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
          <FeedbackButton callback={this.handleOnClick} id="good">hyvä</FeedbackButton>
          <FeedbackButton callback={this.handleOnClick} id="neutral">neutraal</FeedbackButton>
          <FeedbackButton callback={this.handleOnClick} id="bad">huono</FeedbackButton>
        </div>

        <h2>statistiikka</h2>
        <Statistics good={this.state.good} neutral={this.state.neutral} bad={this.state.bad} />
      </div>
    );
  }
}

export default App;

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
