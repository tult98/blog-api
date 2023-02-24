import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError, GraphQLErrorOptions } from 'graphql'

enum CustomServerErrorCode {
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
}

export const ServerErrorCode = {
  ...CustomServerErrorCode,
  ...ApolloServerErrorCode,
}

export class UnauthenticatedError extends GraphQLError {
  constructor() {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: ServerErrorCode.UNAUTHENTICATED,
        http: {
          status: 401,
        },
      },
    }
    super('You must be logged in.', options)
  }
}

export class UnauthorizedError extends GraphQLError {
  constructor() {
    const options: GraphQLErrorOptions = {
      extensions: {
        code: ServerErrorCode.FORBIDDEN,
        http: {
          status: 403,
        },
      },
    }
    super('You are not authorized to perform this action.', options)
  }
}
