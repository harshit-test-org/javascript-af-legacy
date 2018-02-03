/* eslint-env jest */
import reducer from '../../redux/reducers/loading'

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toBe(false)
  })
  it('should set loading', () => {
    expect(reducer(false, { type: 'SET_LOADING' })).toBe(true)
  })
  it('should unset loading', () => {
    expect(reducer(true, { type: 'UNSET_LOADING' })).toBe(false)
  })
})
