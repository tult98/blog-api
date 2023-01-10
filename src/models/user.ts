import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize as sequelizeInstance } from '.'

export const enum ROLE {
  MEMBER = 1,
  ADMIN = 2,
}

export interface UserAttributes {
  id: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  role: ROLE
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'role'> {}
export interface UserInstance extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string
  public email!: string
  public first_name!: string
  public last_name!: string
  public full_name!: string
  public role!: number
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
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: ROLE.MEMBER,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'User',
  }
)

export default User
