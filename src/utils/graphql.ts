import jwt from 'jsonwebtoken'
import { ROLE } from '../models/user'
import { UnauthenticatedError, UnauthorizedError } from './errors'
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

export const authenticated =
  (next: any) => (parent: any, args: any, context: IContext, info: any) => {
    if (!context.user) {
      throw new UnauthenticatedError()
    }

    return next(parent, args, context, info)
  }

export const authorized =
  (role: ROLE) =>
  (next: any) =>
  (parent: any, args: any, context: IContext, info: any) => {
    if (context.user?.role !== role) {
      throw new UnauthorizedError()
    }

    return next(parent, args, context, info)
  }
