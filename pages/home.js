import React, { Component, Fragment } from 'react'
import Router from 'next/router'
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
  justify-content: center;
  z-index: 9750;
  height: 90px;
`

const RepoCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 1rem;
`

class Index extends Component {
  state = {
    prevY: 0,
    loading: false,
    page: 1
  }

  componentDidMount () {
    Router.prefetch('/publish/post')
    // Set up intersection observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }
    this.observer = new IntersectionObserver(this.handleObserver, options)
    this.observer.observe(this.loadTrigger)
  }

  handleObserver = (entities, observer) => {
    if (this.state.loading) return null
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
        <FabButton
          onClick={() => {
            Router.push('/publish/post')
          }}
        />
        <RepoCardContainer>
          <Query query={ReposQuery}>
            {result => {
              if (result.loading) return <h1>Loading</h1>
              if (result.error) return <h1>AWWW Error</h1>
              const { data: { getRepos } } = result
              this.fetchMore = result.fetchMore
              return (
                <Fragment>
                  {getRepos.map(item => (
                    <RepoCard
                      key={item._id}
                      repoId={item._id}
                      title={item.name}
                      text={item.description}
                      image={item.image}
                      userId={item.owner._id}
                      author={item.owner.name}
                      posted={item.posted}
                    />
                  ))}
                </Fragment>
              )
            }}
          </Query>
        </RepoCardContainer>
        <SpinContainer
          innerRef={el => {
            this.loadTrigger = el
          }}
        >
          <h3
            style={
              this.state.loading
                ? { visibility: 'shown' }
                : { visibility: 'visible' }
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
