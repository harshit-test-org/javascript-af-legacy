import React, { Component } from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'
import Layout from '../components/UserLayout'

const Loading = () => <h1 style={{ marginLeft: '25%' }}>Loading....</h1>

class Jobs extends Component {
  render () {
    const links = [
      {
        name: 'Front-end',
        href: '/jobs/front-end'
      },
      {
        name: 'Back-end',
        href: '/jobs/back-end'
      },
      {
        name: 'JavaScript',
        href: '/jobs/javascript'
      },
      {
        name: 'ReactJS',
        href: '/jobs/reactjs'
      },
      {
        name: 'Angular',
        href: '/jobs/angular'
      },
      {
        name: 'Java',
        href: '/jobs/java'
      },
      {
        name: 'PHP',
        href: '/jobs/php'
      },
      {
        name: 'Ruby',
        href: '/jobs/ruby'
      },
      {
        name: 'C/C++',
        href: '/jobs/c'
      }
    ]
    return (
      <Layout title="Home" links={links}>
        <Route path={`${this.props.match.url}`} component={FeedRoute} />
      </Layout>
    )
  }
}
export default Jobs
