export interface GraphqlSubmodule {
  types: string
  queries: string
  mutations: string
  resolvers: {
    queries: Record<string, unknown>
    mutations: Record<string, unknown>
  }
}
