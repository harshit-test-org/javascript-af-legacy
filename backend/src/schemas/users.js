export default `
  type Query{
    getAllUsers: [User],
    getUserById(id:ID!): User!
    getUserGithubRepos(page:Int): [Repo!]
  },
  type User {
    _id: String!,
    username: String!,
    name: String!,
    photoURL: String!,
    bio: String,
    email: String,
    githubURL: String
  }
`
