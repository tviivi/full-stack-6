import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const temp = this.props.store
    const content = e.target.anecdote.value
    temp.dispatch(
      anecdoteCreation(content)
    )
    temp.dispatch({ type: 'CREATENEW', cont: 'you created ' + content })
    setTimeout(function () { temp.dispatch({ type: 'CREATENEW', cont: '' }) }, 5000)
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

export default AnecdoteForm