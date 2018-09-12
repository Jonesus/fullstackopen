import React from 'react'
import ReactDOM from 'react-dom'

const BestAnecdote = ({score, anecdote}) => (
  <React.Fragment>
    <div>
      {anecdote}
    </div>
    <div>
      has {score} votes
    </div>
  </React.Fragment>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      anecdotes: props.anecdotes.map(anecdote => {return {score: 0, anecdote}}),
    }
    this.handleNext = this.handleNext.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.getBestAnecdote = this.getBestAnecdote.bind(this);
  }

  handleNext(e) {
    this.setState({selected: Math.floor(Math.random() * this.props.anecdotes.length)})
  }

  handleVote(e) {
    const temp = [...this.state.anecdotes];
    temp[this.state.selected].score += 1;
    this.setState({anecdotes: temp});
  }

  getBestAnecdote() {
    return this.state.anecdotes.reduce((current, best) =>
      (best.score > current.score) ? best : current);
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.anecdotes[this.state.selected].anecdote}
        </div>
        <div>
          {`has ${this.state.anecdotes[this.state.selected].score} votes`}
        </div>
        <div>
          <button onClick={this.handleVote}>vote</button>
          <button onClick={this.handleNext}>next anecdote</button>
        </div>

        <h2>anecdote with most votes:</h2>
        <div>
          <BestAnecdote {...this.getBestAnecdote()} />
        </div>
      </React.Fragment>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);

