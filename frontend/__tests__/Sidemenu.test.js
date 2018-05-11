import React from 'react'
import { render } from 'react-testing-library'
import Router from 'next/router'
import Sidemenu from '../components/Sidemenu'
import { Provider } from '../components/withAuth'
import MockRouter from '../testUtils/MockRouter'

// Mock the router
Router.router = {
  push() {},
  pathname: '/',
  replace: () => {},
  reload: () => {},
  back: () => {},
  prefetch: () => {},
  beforePopState: () => {}
}

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      BACKEND: 'https://localhost:8080'
    }
  })
})

describe('Sidemenu', () => {
  const user = {
    _id: '5af09c857eba02005a03f756',
    bio: 'I am student. I am studying in class XII . I love programming.',
    email: 'pantharshit00@gmail.com',
    name: 'Harshit Pant',
    photoURL: 'https://avatars3.githubusercontent.com/u/22195362?v=4'
  }
  function getTree(url) {
    return (
      <MockRouter href={url}>
        <Provider value={user}>
          <Sidemenu />
        </Provider>
      </MockRouter>
    )
  }
  test('it should render properly (Snapshot)', () => {
    expect(render(getTree('/')).container.firstChild).toMatchSnapshot()
  })

  test('it should have correct active class', () => {
    Router.router.pathname = '/trending'
    const { getByTestId } = render(getTree('/trending'))
    expect(getByTestId('tren').classList.contains('active')).toBeTruthy()
  })
})
