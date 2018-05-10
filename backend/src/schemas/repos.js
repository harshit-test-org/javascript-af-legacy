export default `
  type Query {
    getRepos(page:Int): [RepoPreview!]
    getRepo(id:ID!): Repo!
    getReposByUser(id:ID!, page: Int): [RepoPreview!]
    getEditorsChoiceRepos(page:Int): [RepoPreview!]
  }
  type Mutation {
    createRepository(name:String!, nameWithOwner: String!, description: String!): Repo!
  }
  type RepoPreview{
    _id: ID
    url: String
    nameWithOwner: String
    name: String!
    owner: User!
    description: String
    posted: String
  }
  type Repo{
    _id: ID
    url: String
    nameWithOwner: String
    name: String!
    owner: User!
    description: String
    readme: String
    starCount: Int
    posted: String
    issues: Int
    license: String
    homepage: String
    prs: Int
    pushedAt: String
    activity: [Int]
  }
`
