import mongoose from 'mongoose'
import graphql from '../lib/graphql'

const User = mongoose.model('User')

export default {
  Query: {
    getUserById: async (_, { id }) => {
      const user = await User.findOne({ _id: id })
      return user
    },
    getUserGithubRepos: async (_, { page }, { user }) => {
      const first = page * 10 || '10'
      console.log(first)
      const { data: repos } = await graphql({
        query: `
            {
              viewer {
                repositories(orderBy: {field: STARGAZERS, direction: DESC},first:${first}) {
                    nodes {
                      name
                      nameWithOwner
                      id
                      url
                      description
                      stargazers{
                        totalCount
                      }
                    }
                }
              }
            }
        `,
        headers: {
          Authorization: `bearer ${user.token}`
        }
      })
      return repos.data.viewer.repositories.nodes.slice(first - 10).map(item => ({
        owner: user,
        name: item.name,
        url: item.url,
        nameWithOwner: item.nameWithOwner,
        description: item.description,
        starCount: item.stargazers.totalCount,
        imageURL: user.photoURL,
        _id: item.id
      }))
    }
  },
  User: {
    username: ({ username, name }) => {
      return username || name.replace(/\s+/g, '')
    },
    githubURL: ({ username, name }) => {
      username = username || name.replace(/\s+/g, '')
      return `https://www.github.com/${username}`
    }
  }
}
