import { createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import { combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
  })

const store = createStore(reducer)

export default store