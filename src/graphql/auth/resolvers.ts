import bcrypt from 'bcrypt'
import { addMinutes } from 'date-fns'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import User, { AccountInput } from '../../models/user'
import { ServerErrorCode } from '../../utils/errors'
import { CredentialsInput, Tokens } from './../../models/user'
import { authenticated, IContext } from './../../utils/graphql'
import {
  INVALID_INPUT_MESSAGE,
  isValidEmail,
  isValidPassword,
} from './../../utils/validators'

const SALT_ROUNDS = 10

const register = async (
  _: any,
  { input }: { input: AccountInput }
): Promise<User> => {
  const { email, firstName, lastName, fullName, password } = input
  if (!isValidEmail(email)) {
    throw new GraphQLError(INVALID_INPUT_MESSAGE, {
      extensions: {
        code: ServerErrorCode.BAD_USER_INPUT,
        field: 'email',
      },
    })
  }

  if (!isValidPassword(password)) {
    throw new GraphQLError('Password is too weak', {
      extensions: {
        code: ServerErrorCode.BAD_USER_INPUT,
        field: 'password',
      },
    })
  }

  let userInstance = await User.findOne({ where: { email } })
  if (userInstance) {
    throw new GraphQLError('The user already exists by this email.', {
      extensions: {
        code: ServerErrorCode.BAD_USER_INPUT,
        field: 'email',
      },
    })
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  userInstance = await User.create({
    email,
    firstName,
    lastName,
    fullName,
    password: hashedPassword,
  })

  return userInstance
}

const login = async (
  _: any,
  { input }: { input: CredentialsInput }
): Promise<Tokens> => {
  const { email, password } = input
  if (!isValidEmail(email)) {
    throw new GraphQLError(INVALID_INPUT_MESSAGE, {
      extensions: {
        code: ServerErrorCode.BAD_USER_INPUT,
        field: 'email',
      },
    })
  }

  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new GraphQLError('Email or password is incorrect', {
      extensions: {
        code: ServerErrorCode.BAD_USER_INPUT,
      },
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new GraphQLError('Email or password is incorrect', {
      extensions: {
        code: ServerErrorCode.BAD_USER_INPUT,
      },
    })
  }

  const payload = { id: user.id, role: user.role }
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string, // must have
    {
      expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRE_TIME ?? 15) * 60 * 1000, // milliseconds
    }
  )
  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_PRIVATE_KEY as string, // must have
    {
      expiresIn:
        Number(process.env.REFRESH_TOKEN_EXPIRE_TIME ?? 24 * 60 * 30) *
        60 *
        1000, // milliseconds
    }
  )

  return {
    accessToken,
    refreshToken,
    expiresAt: addMinutes(
      Date.now(),
      Number(process.env.ACCESS_TOKEN_EXPIRE_TIME ?? 15)
    ),
  }
}

const getNewToken = async (
  _: any,
  { refreshToken }: { refreshToken: string }
): Promise<Tokens> => {
  // verify refresh token
  const payload = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_PRIVATE_KEY as string
  )
  // in case refreshToken is valid
  const newAccessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string
  )

  return {
    accessToken: newAccessToken,
    refreshToken,
    expiresAt: addMinutes(
      Date.now(),
      Number(process.env.ACCESS_TOKEN_EXPIRE_TIME ?? 15)
    ),
  }
}

const me = async (
  _: unknown,
  __: unknown,
  context: IContext
): Promise<User> => {
  const userId = context.user?.id
  const userInstance = await User.findByPk(userId)

  if (!userInstance) {
    throw new GraphQLError('Not found logged in user', {
      extensions: {
        code: ServerErrorCode.BAD_REQUEST,
        http: {
          status: 400,
        },
      },
    })
  }

  return userInstance
}

const mutations = {
  register,
}

const queries = {
  login,
  me: authenticated(me),
  getNewToken,
}

export const resolvers = { queries, mutations }
