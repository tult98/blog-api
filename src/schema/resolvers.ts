export const resolvers = {
  Query: {
    users: async () => {
      return [
        {
          email: 'lethanhtu1551998@gmail.com',
          firstName: 'Le',
          lastName: 'Thanh Tu',
        },
      ]
    },
  },
}
