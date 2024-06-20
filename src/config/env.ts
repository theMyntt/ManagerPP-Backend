const ensureEnvVariable = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`${key} is not provided`)
  }
  return value
}

export const env = {
  NEST_PORT: parseInt(process.env.NEST_PORT, 10) || 1023,
  NEST_PRODUCTION: process.env.NEST_PRODUCTION === 'true',
  MYSQL_PORT: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
  MYSQL_DATABASE: ensureEnvVariable('MYSQL_DATABASE'),
  MYSQL_SYNCRONIZE: process.env.MYSQL_SYNCRONIZE === 'true'
}
