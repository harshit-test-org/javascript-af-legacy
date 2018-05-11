/* eslint-env jest */
import React from 'react'
import Router from 'next/router'
import { render, Simulate } from 'react-testing-library'
import PostCard from '../components/PostCard'

jest.mock('next/router', () => {
  return {
    push: () => {}
  }
})

describe('PostCard', () => {
  const comp = (
    <PostCard
      repoId="5dsfdf54d6"
      title="My Repo"
      userId="ds5645"
      text="something"
      author="Harshit"
      image="https://soemthing/i.png"
      post="1 sec ago"
      url="https://github.com/pantharshit00/graphcool"
    />
  )
  test('should render properly (Snapshot)', () => {
    expect(render(comp).container.firstChild).toMatchSnapshot()
  })

  test('should navigate to correct repo', async () => {
    const spy = jest.spyOn(Router, 'push')
    const { getByText } = render(comp)
    Simulate.click(getByText('My Repo'))
    expect(spy).toHaveBeenCalledWith('/template?id=5dsfdf54d6', '/repo/5dsfdf54d6')
  })

  test('should navigate to user page', async () => {
    const spy = jest.spyOn(Router, 'push')
    const { getByText } = render(comp)
    Simulate.click(getByText('Harshit'))
    expect(spy).toHaveBeenCalledWith('/user?id=ds5645', '/user/ds5645')
  })

  test('should navigate corrent git repo', async () => {
    const { getByTestId } = render(comp)
    window.location.assign = jest.fn()
    Simulate.click(getByTestId('github'))
    expect(window.location.assign).toBeCalledWith('https://github.com/pantharshit00/graphcool')
  })
})
