import React, { Component } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import RepoCard from './PostCard'

const SpinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9750;
  height: 90px;
  @media all and (max-width: 790px) {
    margin-bottom: 45px;
  }
`

const RepoCardContainer = styled.div`
  display: ${props => (props.grid ? 'grid' : 'flex')};
  flex-direction: column;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 1rem;
`

export default class RepoMasonry extends Component {
  state = {
    prevY: 0,
    loading: false,
    page: 1
  }
  static defaultProps = {
    grid: true
  }

  componentDidMount() {
    // Set up intersection observer
    const options = {
      root: null,
      rootMargin: '250px 0px',
      threshold: 0.01
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
            [this.props.gKey]: [...prev[this.props.gKey], ...fetchMoreResult[this.props.gKey]]
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
  componentWillUnmount() {
    this.observer.disconnect()
  }

  render() {
    return (
      <>
        <RepoCardContainer grid={this.props.grid}>
          <Query query={this.props.query} variables={this.props.vars}>
            {result => {
              if (result.loading) return <h1>Loading</h1>
              if (result.error) return <h1>AWWW Error</h1>

              const d = result.data[this.props.gKey]
              this.fetchMore = result.fetchMore
              return (
                <>
                  {d.map(item => (
                    <RepoCard
                      key={item._id}
                      repoId={item._id}
                      url={item.url}
                      title={item.name}
                      text={item.description}
                      image={item.owner.photoURL + '&s=50'}
                      userId={item.owner._id}
                      author={item.owner.name}
                      posted={item.posted}
                    />
                  ))}
                </>
              )
            }}
          </Query>
        </RepoCardContainer>
        <SpinContainer
          innerRef={el => {
            this.loadTrigger = el
          }}
        >
          <h3 style={this.state.loading ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            Loading more awesome repos 😎...
          </h3>
        </SpinContainer>
      </>
    )
  }
}
