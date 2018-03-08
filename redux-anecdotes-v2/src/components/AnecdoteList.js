import React from 'react'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  nimi2 = (anecdote) => {
    return anecdote.content.toLowerCase().includes(this.props.filter.toLowerCase())
  }

  handleClickButton = (anecdote) => () => {
    this.props.vote(anecdote)
  }

  render() {
    const anecdotes = this.props.anecdotes
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
    filter: state.filter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (anecdote) => {
      dispatch({ type: 'VOTE', id: anecdote.id }),
        dispatch({ type: 'CHANGE', cont: 'you voted for "' + anecdote.content + '"' }),
        setTimeout(function () { dispatch({ type: 'CHANGE', cont: '' }) }, 5000)
    }
  }
}


const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
