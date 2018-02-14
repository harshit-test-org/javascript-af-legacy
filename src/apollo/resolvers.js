export default {
  Mutation: {
    setUser: (_, { user }, { cache }) => {
      cache.writeData({ data: { user } })
      return { user, __typename: 'LocalUser' }
    }
  }
}
