import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import { combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
  })

const store = createStore(reducer)

export default store