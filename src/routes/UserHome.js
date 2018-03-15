import React, { Component } from 'react'
import Masonry from 'react-masonry-component'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import RepoCard from '../components/PostCard'
import FabButton from '../components/FabButton'
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
        _id
        name
      }
    }
  }
`

class Index extends Component {
  render () {
    return (
      <Layout title="Discover">
        <FabButton />
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
      </Layout>
    )
  }
}

export default Index
