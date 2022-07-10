import userTasks from './userTasks'
import stocks from './stocks'
import accountsData from './accountsData'
import {combineReducers} from 'redux'

import {
    USER_LOGOUT,
  } from '../actions/accountsData';

const appReducer = combineReducers({
    userTasks,
    stocks,
    accountsData,
})

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
      state = undefined
    }
  
    return appReducer(state, action)
  }

export default rootReducer