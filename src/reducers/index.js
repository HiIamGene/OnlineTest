import { combineReducers } from 'redux'
import counters from './counters'
import createTest from './createTest'
import testBank from './testBank'
export default combineReducers({
  counters,
  createTest,
  testBank
})