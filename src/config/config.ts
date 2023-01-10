import { IConfig } from '../models'

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME ?? 'root',
    password: process.env.DEV_DB_PASSWORD ?? 'password',
    database: process.env.DEV_DB_DATABASE ?? 'blog',
    host: process.env.DEV_DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DEV_DB_PORT) ?? 3306,
    dialect: 'mysql',
  },
  test: {
    username: process.env.CI_DB_USERNAME ?? 'root',
    password: process.env.CI_DB_PASSWORD ?? 'password',
    database: process.env.CI_DB_DATABASE ?? 'test_blog',
    host: process.env.CI_DB_HOST ?? '127.0.0.1',
    port: Number(process.env.CI_DB_PORT) ?? 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.PROD_DB_USERNAME ?? 'root',
    password: process.env.PROD_DB_PASSWORD ?? 'password',
    database: process.env.PROD_DB_DATABASE ?? 'prod_blog',
    host: process.env.PROD_DB_HOST ?? '127.0.0.1',
    port: Number(process.env.CI_DB_PORT) ?? 3306,
    dialect: 'mysql',
  },
} as Record<string, IConfig>

// export default configByEnvironment
