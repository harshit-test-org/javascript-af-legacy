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

const ReposQuery = gql`
  query getRepos($page: Int) {
    getRepos(page: $page) {
      _id
      posted
      name
      image
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
  flex-direction: column;
  align-items: center;
  z-index: 9750;
  height: 90px;
`

class Index extends Component {
  state = {
    prevY: 0,
    loading: false,
    page: 1
  }

  componentDidMount () {
    Router.prefetch('/repo/post')
    // Set up intersection observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }
    this.observer = new IntersectionObserver(this.handleObserver, options)
    this.observer.observe(this.loadTrigger)
    if (window.innerHeight > this.loadTrigger.offsetTop) {
      this.fetchMoreData()
    }
  }

  handleObserver = (entities, observer) => {
    // only run code in if-block when scrolling down, not up
    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      this.fetchMoreData()
    }
    this.setState({ prevY: y })
  }
  fetchMoreData = () => {
    console.log('observer callback run')
    this.setState({ loading: true })
    // running callback takes some time
    if (this.fetchMore) {
      this.fetchMore({
        variables: {
          page: this.state.page + 1
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return {
            ...prev,
            getRepos: [...prev.getRepos, ...fetchMoreResult.getRepos]
          }
        }
      }).then(() => {
        this.setState(state => ({
          page: state.page + 1,
          loading: false
        }))
      })
    }
  }
  componentWillUnmount () {
    this.observer.disconnect()
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
              this.fetchMore = result.fetchMore
              return (
                <Masonry>
                  {getRepos.map(item => (
                    <div className="col s12 m4 l4 xl3" key={item._id}>
                      <RepoCard
                        repoId={item._id}
                        title={item.name}
                        text={item.description}
                        image={item.image}
                        userId={item.owner._id}
                        author={item.owner.name}
                        posted={item.posted}
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
          <h3
            style={
              this.state.loading ? { display: 'block' } : { display: 'none' }
            }
          >
            Loading more awesome repos 😎...
          </h3>
        </SpinContainer>
      </Layout>
    )
  }
}

export default withData(Index)
