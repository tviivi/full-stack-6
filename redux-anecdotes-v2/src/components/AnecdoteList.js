import React from 'react'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  nimi2 = (anecdote) => {
    return anecdote.content.toLowerCase().includes(this.props.store.getState().filter.toLowerCase())
  }

  handleClickButton = (anecdote) => () => {
    const temp = this.props.store
    return (
      temp.dispatch({ type: 'VOTE', id: anecdote.id }),
      temp.dispatch({ type: 'CHANGE', cont: 'you voted for "' + anecdote.content + '"' }),
      setTimeout(function () { temp.dispatch({ type: 'CHANGE', cont: '' }) }, 5000)
    )
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.filter(this.nimi2).sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleClickButton(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, dispatch) => {
  return {
    anecdotes: state.anecdotes,
    notifications: state.notifications,
    setFilter: (nimi) => {
      dispatch({ type: 'SET_FILTER', filter: nimi })
  }
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdoteList
