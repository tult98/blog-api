import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import User, { UserInput } from '../../models/user'
import { ServerErrorCode } from '../../utils/errors'
import { LoginInput, LoginToken } from './../../models/user'
import {
  BAD_USER_INPUT,
  INVALID_INPUT_MESSAGE,
  isValidEmail,
  isValidPassword,
} from './../../utils/validators'

const SALT_ROUNDS = 10

const register = async (_: any, args: UserInput): Promise<User> => {
  const { email, firstName, lastName, fullName, password, confirmPassword } =
    args
  if (!isValidEmail(email)) {
    throw new GraphQLError(INVALID_INPUT_MESSAGE, {
      extensions: {
        code: ServerErrorCode.BAD_USER_INPUT,
        field: 'email',
      },
    })
  }

  if (password !== confirmPassword) {
    throw new GraphQLError(INVALID_INPUT_MESSAGE, {
      extensions: {
        code: ServerErrorCode.BAD_USER_INPUT,
        field: 'confirmPassword',
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

const login = async (_: any, args: LoginInput): Promise<LoginToken> => {
  const { email, password } = args
  if (!isValidEmail(email)) {
    throw new GraphQLError(INVALID_INPUT_MESSAGE, {
      extensions: {
        code: BAD_USER_INPUT,
        field: 'email',
      },
    })
  }

  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new GraphQLError('Email or password is incorrect', {
      extensions: {
        code: BAD_USER_INPUT,
      },
    })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new GraphQLError('Email or password is incorrect', {
      extensions: {
        code: BAD_USER_INPUT,
      },
    })
  }

  const payload = { id: user.id, role: user.role }
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string, // must have
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME ?? '15m',
    }
  )
  const refreshToken = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_PRIVATE_KEY as string, // must have
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME ?? '30d',
    }
  )

  return { accessToken, refreshToken }
}

const mutations = {
  register,
}

const queries = {
  login,
}

export const resolvers = { queries, mutations }
