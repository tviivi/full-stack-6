import React from 'react'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  anecdotes = this.props.anecdotes
  
  handleClickButton = (anecdote) => () => {
    this.props.vote(anecdote)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow.map(anecdote =>
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

const nimi2 = (filter) => (anecdote) => {
  return anecdote.content.toLowerCase().includes(filter.toLowerCase())
}
const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(nimi2(filter)).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state, dispatch) => {
  console.log('state', state.anecdotes)
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter),
    notifications: state.notifications
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (anecdote) => {
      dispatch({ type: 'VOTE', id: anecdote.id })
      dispatch({ type: 'CHANGE', cont: 'you voted for "' + anecdote.content + '"' })
      setTimeout(function () { dispatch({ type: 'CHANGE', cont: '' }) }, 5000)
    }
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
