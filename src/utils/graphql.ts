import jwt from 'jsonwebtoken'
export interface GraphqlSubmodule {
  types: string
  queries: string
  mutations: string
  resolvers: {
    queries: Record<string, unknown>
    mutations: Record<string, unknown>
  }
}

export interface IUserContext {
  id: string
  role: number
}

export interface IContext {
  user?: IUserContext
}

export const getUserFromToken = async (
  token: string
): Promise<IUserContext> => {
  const payload = (await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string
  )) as IUserContext

  return payload
}
