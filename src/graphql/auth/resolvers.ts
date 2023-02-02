import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'
import User, { UserInput } from '../../models/user'

const SALT_ROUNDS = 10
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

const queries = {}

const register = async (_: any, args: UserInput): Promise<User> => {
  const { email, firstName, lastName, fullName, password, confirmPassword } =
    args
  if (password !== confirmPassword) {
    throw new GraphQLError('Invalid argument value', {
      extensions: {
        code: 'BAD_USER_INPUT',
        field: 'confirmPassword',
      },
    })
  }
  if (!PASSWORD_REGEX.test(password)) {
    throw new GraphQLError('Password is too weak', {
      extensions: {
        code: 'BAD_USER_INPUT',
        field: 'password',
      },
    })
  }

  let userInstance = await User.findOne({ where: { email } })
  if (userInstance) {
    throw new GraphQLError('That email already registered.', {
      extensions: {
        code: 'BAD_USER_INPUT',
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

const mutations = {
  register,
}

export const resolvers = { queries, mutations }
