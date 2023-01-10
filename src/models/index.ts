import * as fs from 'fs'
import * as path from 'path'
import Sequelize from 'sequelize'
import configByEnvironment from '../config/config'

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const db: Record<string, any> = {}
const config = configByEnvironment[env]

const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
