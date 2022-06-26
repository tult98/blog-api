import http from 'http'
import express from 'express'
import { DocumentNode } from 'graphql'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { typeDefs } from './schema/typeDefs'
import { resolvers } from './schema/resolvers'

async function startApolloServer({
  typeDefs,
  resolvers,
}: {
  typeDefs: DocumentNode
  resolvers: any
}) {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  )
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer({ typeDefs, resolvers })
