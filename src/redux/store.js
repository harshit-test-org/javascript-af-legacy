import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/user'

const initialState = {
  user: null
}

const rootReducer = combineReducers({ user: userReducer })

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
