import React, { Component } from 'react'
import Masonry from 'react-masonry-component'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import RepoCard from '../components/PostCard'
import Layout from '../components/UserLayout'
import '../components/styles/grid.css'

const ReposQuery = gql`
  {
    getRepos {
      _id
      name
      imageURL
      description
      owner {
        name
      }
    }
  }
`

class Index extends Component {
  render () {
    return (
      <Layout title="Home">
        <div className="row">
          <Query query={ReposQuery}>
            {result => {
              if (result.loading) return <h1>Loading</h1>
              if (result.error) return <h1>AWWW Error</h1>

              const { data: { getRepos } } = result
              return (
                <Masonry>
                  {getRepos.map(item => (
                    <div className="col s12 m6 l4 xl3" key={item._id}>
                      <RepoCard
                        key={item._id}
                        title={item.name}
                        text={item.description}
                        image={item.imageURL}
                      />
                    </div>
                  ))}
                </Masonry>
              )
            }}
          </Query>
        </div>
      </Layout>
    )
  }
}

export default Index
