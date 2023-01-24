import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers, typeDefs } from './graphql'

async function startApolloServer({
  typeDefs,
  resolvers,
}: {
  typeDefs: string
  resolvers: any
}) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀  Server ready at: ${url}`)
}

startApolloServer({ typeDefs, resolvers })
