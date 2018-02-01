/* eslint-env jest */
import React from 'react'
import { render } from 'enzyme'
import UserHome from '../routes/UserHome'

describe('<UserHome />', () => {
  it('should render without creashing', () => {
    render(<UserHome />)
  })
})
