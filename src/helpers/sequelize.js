// dotenv
import dotenv from 'dotenv'
dotenv.config()

// ORM
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false,
})

export default sequelize
