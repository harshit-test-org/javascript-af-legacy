export const setUser = ({ email, displayName, photoURL, uid }) => ({
  type: 'SET_USER',
  payload: {
    email,
    displayName,
    photoURL,
    uid
  }
})
