import 'dotenv/config'
import knex from 'knex'

const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_DBUSERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  pool: {
    min: parseInt(process.env.MYSQL_POOL_MIN) || 1,
    max: parseInt(process.env.MYSQL_POOL_MAX) || 10,
  }
})

export default db;
