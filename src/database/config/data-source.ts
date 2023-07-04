import { Sequelize } from "sequelize"

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPass = process.env.DB_PASS as string | undefined
const dbHost = process.env.DB_HOST as string | undefined

export const sequelize: Sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql'
})
