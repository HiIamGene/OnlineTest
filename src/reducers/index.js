import { combineReducers } from 'redux'
import counters from './counters'
import createTest from './createTest'
import testBank from './testBank'
import scoreTest from './scoreTest'
import doTest from './doTest'
export default combineReducers({
  counters,
  createTest,
  testBank,
  scoreTest,
  doTest
})