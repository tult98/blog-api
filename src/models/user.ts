import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

import { sequelize as sequelizeInstance } from '.'

export const enum ROLE {
  MEMBER = 1,
  ADMIN = 2,
}

export interface AccountInput {
  email: string
  firstName: string
  lastName: string
  fullName: string
  password: string
}

export interface UserInstance {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  role: ROLE
  createdAt: Date | string
  updatedAt: Date | string
}

export interface CredentialsInput {
  email: string
  password: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
  expiresAt: Date
}

// eslint-disable-next-line
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>
  declare email: string
  declare firstName: string
  declare lastName: string
  declare fullName: string
  declare role: CreationOptional<number>
  declare password: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.SMALLINT,
      defaultValue: ROLE.MEMBER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize: sequelizeInstance, underscored: true }
)

export default User
