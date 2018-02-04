/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import UserHome from '../../routes/UserHome'

describe('<UserHome />', () => {
  it('should render without creashing', () => {
    shallow(<UserHome />)
  })
})
