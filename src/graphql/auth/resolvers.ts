import bcrypt from 'bcrypt'
import { GraphQLError } from 'graphql'
import User, { UserInput } from '../../models/user'

const SALT_ROUNDS = 10

const queries = {}

const register = async (
  _: any,
  { user }: { user: UserInput }
): Promise<User> => {
  const { email, firstName, lastName, fullName, password, confirmPassword } =
    user
  if (password !== confirmPassword) {
    throw new GraphQLError('Invalid argument value', {
      extensions: {
        code: 'BAD_USER_INPUT',
        field: 'confirmPassword',
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
