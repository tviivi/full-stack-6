import React from 'react'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {

                const temp = this.props.store
                return (
                  temp.dispatch({ type: 'VOTE', id: anecdote.id }),
                  temp.dispatch({ type: 'CHANGE', cont: 'you voted for "' + anecdote.content + '"'}),
                  setTimeout(function(){temp.dispatch({type: 'CHANGE', cont: ''})}, 5000)
                )
              }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
