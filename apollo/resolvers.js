export default {
  Query: {
    user: null
  },
  Mutation: {
    setUser: (_, { user }, { cache }) => {
      cache.writeData({ data: { user, __typename: 'LocalUser' } })
      return { user, __typename: 'LocalUser' }
    }
  }
}
