
import { createStore ,applyMiddleware  } from 'redux';
import  rootReducer  from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension'

function logger({ getState }) {
    return next => action => {
      console.log('will dispatch', action)
  
      // Call the next dispatch method in the middleware chain.
      const returnValue = next(action)
  
      console.log('state after dispatch', getState())
  
      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue
    }
  }

export const store = createStore(rootReducer,composeWithDevTools());