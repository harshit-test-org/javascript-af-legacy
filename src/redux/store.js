import { createStore } from 'redux'

const store = createStore(
  state => state,
  42,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
