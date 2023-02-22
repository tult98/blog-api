import Sequelize, { Options } from 'sequelize'
import * as configByEnvironment from '../config/config'

export interface IConfig extends Options {
  username: string
  password: string
  database: string
  host: string
  port: number
}

export interface IMeta {
  total: number
}

// const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const db: Record<string, any> = {}

const config = (configByEnvironment as Record<string, IConfig>)[env]

export const sequelize = new Sequelize.Sequelize(config)

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     )
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     )
//     db[model.name] = model
//   })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

export default db
