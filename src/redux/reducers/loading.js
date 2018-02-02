export default (state = false, { type }) => {
  switch (type) {
    case 'SET_LOADING':
      return true
    case 'UNSET_LOADING':
      return false
    default:
      return state
  }
}
