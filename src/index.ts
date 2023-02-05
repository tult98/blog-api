import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers, typeDefs } from './graphql'
import { getUserFromToken, IContext } from './utils/graphql'

async function startApolloServer({
  typeDefs,
  resolvers,
}: {
  typeDefs: string
  resolvers: any
}) {
  const server = new ApolloServer<IContext>({
    typeDefs,
    resolvers,
  })
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers?.authorization
      if (!token) {
        return { user: undefined }
      }
      const user = await getUserFromToken(token)

      return { user }
    },
    listen: { port: 4000 },
  })

  console.log(`🚀  Server ready at: ${url}`)
}

startApolloServer({ typeDefs, resolvers })
