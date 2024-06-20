export default () => ({
  NEST_PORT: parseInt(process.env.NEST_PORT, 10) || 3000,
  NEST_PRODUCTION: process.env.NEST_PRODUCTION === 'true',
  MYSQL_PORT: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'manager_db',
  MYSQL_SYNCRONIZE: process.env.MYSQL_SYNCRONIZE === 'true'
})
