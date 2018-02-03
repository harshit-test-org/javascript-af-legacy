/* eslint-env jest */
import * as action from '../../redux/actions/user'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const user = {
      email: 'pantharshit00@gmail.com',
      photoURL: 'https://avatars3.githubusercontent.com/u/22195362?s=460&v=4',
      displayName: 'Harshit Pant',
      uid: 'slkjldsKfj'
    }
    const expectedAction = {
      type: 'SET_USER',
      payload: {
        email: 'pantharshit00@gmail.com',
        photoURL: 'https://avatars3.githubusercontent.com/u/22195362?s=460&v=4',
        displayName: 'Harshit Pant',
        uid: 'slkjldsKfj'
      }
    }
    expect(action.setUser(user)).toEqual(expectedAction)
  })
})
