import React, { Component } from 'react'
// import Loadable from 'react-loadable'
// import { Route } from 'react-router-dom'
import Layout from '../components/UserLayout'

// const Loading = () => <h1 style={{ marginLeft: '25%' }}>Loading....</h1>

// const FeedRoute = Loadable({
//   loader: () => import('./userhome/feed'),
//   loading: Loading
// })

class Index extends Component {
  render () {
    const links = [
      {
        name: "Repo's",
        href: '/home/prejects'
      },
      {
        name: 'Feed',
        href: '/home/feed'
      }
    ]
    return (
      <Layout title="Home" links={links}>
        {/* <Route path={`${this.props.match.url}/feed`} component={FeedRoute} /> */}
      </Layout>
    )
  }
}

export default Index
