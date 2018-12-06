import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './counterReducer'

const store = createStore(counterReducer)

const FeedbackButton = ({callback, children}) => (
  <button onClick={callback}>{children}</button>
);

const StatisticRow = ({heading, data}) => (
  <tr>
    <th>{heading}</th>
    <td>{data}</td>
  </tr>
);

const Statistics = ({good, ok, bad}) => (
  <div>
    {(good + ok + bad) === 0 ? (
      <div>ei yhtään palautetta annettu</div>
    ) : (
      <table>
        <tbody>
          <StatisticRow
            heading="hyvä"
            data={good}
          />
          <StatisticRow
            heading="neutraali"
            data={ok}
          />
          <StatisticRow
            heading="huono"
            data={bad}
          />
          <StatisticRow
            heading="keskiarvo"
            data={(((good - bad) / (good + ok + bad)) || 0).toFixed(1)}
          />
          <StatisticRow
            heading="positiivisia"
            data={`${(((good / (good + ok + bad))*100) || 0).toFixed(1)} %`}
          />
        </tbody>
      </table>
    )}
  </div>
);

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>anna palautetta</h1>
        <div>
          <FeedbackButton callback={e => store.dispatch({ type: 'GOOD' })}>
            hyvä
          </FeedbackButton>
          <FeedbackButton callback={e => store.dispatch({ type: 'OK' })}>
            neutraali
          </FeedbackButton>
          <FeedbackButton callback={e => store.dispatch({ type: 'BAD' })}>
            huono
          </FeedbackButton>
        </div>

        <h2>statistiikka</h2>
        <Statistics {...store.getState()} />
        <button onClick={e => store.dispatch({ type: 'ZERO' })}>
          nollaa
        </button>
      </div>
    );
  }
}

export default App;

const renderApp = () => ReactDOM.render(
  <App />,
  document.getElementById('root')
)

renderApp()
store.subscribe(renderApp)
