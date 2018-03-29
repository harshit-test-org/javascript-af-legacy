import React, { Component } from 'react'
import Masonry from 'react-masonry-component'
import Router from 'next/router'
import Head from 'next/head'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'
import RepoCard from '../components/PostCard'
import FabButton from '../components/FabButton'
import withData from '../apollo/wihData'

import Layout from '../components/UserLayout'
import Spinner from '../components/Spinner'

const ReposQuery = gql`
  {
    getRepos {
      _id
      name
      imageURL
      description
      owner {
        _id
        name
      }
    }
  }
`

const SpinContainer = styled.div`
  display: flex;
  height: 45px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  z-index: 9750;
`

class Index extends Component {
  state = {
    prevY: 0,
    loading: false
  }

  componentDidMount () {
    Router.prefetch('/repo/post')
    // Set up intersection observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    this.observer = new IntersectionObserver(this.handleObserver, options)
    this.observer.observe(this.loadTrigger)
  }

  handleObserver = (entities, observer) => {
    // only run code in if-block when scrolling down, not up
    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      console.log('observer callback run')
      this.setState({ loading: true })
      // running callback takes some time
      setTimeout(() => {
        this.setState({ loading: false })
      }, 3000)
    }
    this.setState({ prevY: y })
  }

  render () {
    return (
      <Layout title="Discover">
        <Head>
          <link rel="stylesheet" href="/static/grid.css" />
        </Head>
        <FabButton
          onClick={() => {
            Router.push('/repo/post')
          }}
        />
        <div className="row">
          <Query query={ReposQuery}>
            {result => {
              if (result.loading) return <h1>Loading</h1>
              if (result.error) return <h1>AWWW Error</h1>
              const { data: { getRepos } } = result
              return (
                <Masonry>
                  {getRepos.map(item => (
                    <div className="col s12 m4 l4 xl3" key={item._id}>
                      <RepoCard
                        title={item.name}
                        text={item.description}
                        image={item.imageURL}
                        userId={item.owner._id}
                      />
                    </div>
                  ))}
                </Masonry>
              )
            }}
          </Query>
        </div>
        <SpinContainer
          innerRef={el => {
            this.loadTrigger = el
          }}
        >
          <Spinner className="la-2x" hidden={!this.state.loading} />
        </SpinContainer>
      </Layout>
    )
  }
}

export default withData(Index)
