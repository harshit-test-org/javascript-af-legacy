/* eslint-env jest */
import React from 'react'
import { render } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import Sidemenu from '../../components/Sidemenu'

describe('<Sidebar />', () => {
  it('should have five links', () => {
    const result = render(
      <MemoryRouter>
        <Sidemenu />
      </MemoryRouter>
    )
    const length = result.find('a')
    expect(length).toHaveLength(5)
  })
  it('should have proper hrefs', () => {
    const result = render(
      <MemoryRouter>
        <Sidemenu />
      </MemoryRouter>
    )
    const links = result.find('a')
    const hrefs = ['/home', '/search', '/jobs', '/social', '/profile']
    for (let i = 0; i < links.length; i++) {
      expect(links[i].attribs.href).toBe(hrefs[i])
    }
  })
})
