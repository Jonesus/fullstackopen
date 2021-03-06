import React from 'react';


class App extends React.Component {
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e =>
                this.props.store.dispatch({ type: 'VOTE', id: anecdote.id})}
              >
                vote
              </button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={e => {
          e.preventDefault()
          this.props.store.dispatch({
            type: 'NEW_ANECDOTE',
            data: e.target.anecdote.value
          })
          e.target.anecdote.value = ''
        }}>
          <div><input name="anecdote"/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App
