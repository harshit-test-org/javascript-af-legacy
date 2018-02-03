/* eslint-env jest */
import reducer from '../../redux/reducers/user'

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })
  it('should set the user', () => {
    const user = {
      email: 'pantharshit00@gmail.com',
      photoURL: 'https://avatars3.githubusercontent.com/u/22195362?s=460&v=4',
      displayName: 'Harshit Pant',
      uid: 'slkjldskfj'
    }
    expect(reducer({}, { type: 'SET_USER', payload: user })).toEqual({
      email: 'pantharshit00@gmail.com',
      photoURL: 'https://avatars3.githubusercontent.com/u/22195362?s=460&v=4',
      displayName: 'Harshit Pant',
      uid: 'slkjldskfj'
    })
  })
})
