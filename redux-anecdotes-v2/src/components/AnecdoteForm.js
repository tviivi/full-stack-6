import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.createNew(content)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      createNew: (content) => {
        dispatch(anecdoteCreation(content))
        dispatch({ type: 'CREATENEW', cont: 'you created "' + content + '"'})
        setTimeout(function () { dispatch({ type: 'CREATENEW', cont: '' }) }, 5000)
      }
  }
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm