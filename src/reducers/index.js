import { combineReducers } from 'redux'
import counters from './counters'
import createTest from './createTest'
export default combineReducers({
  counters,
  createTest
})