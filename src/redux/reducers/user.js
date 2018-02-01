export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return { ...state, ...payload }
    default:
      return state
  }
}
