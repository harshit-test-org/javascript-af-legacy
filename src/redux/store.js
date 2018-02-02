import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/user'
import authLoadingReducer from './reducers/loading'

const initialState = {
  user: null,
  authLoading: true
}

const rootReducer = combineReducers({
  user: userReducer,
  authLoading: authLoadingReducer
})

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
