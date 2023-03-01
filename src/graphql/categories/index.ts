import { GraphqlSubmodule } from './../../utils/graphql'
import { mutations } from './mutations'
import { queries } from './queries'
import { resolvers } from './resolvers'
import { types } from './types'

export const Category: GraphqlSubmodule = {
  types,
  mutations,
  queries,
  resolvers,
}
