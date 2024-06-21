import { get } from 'env-var'

export const env = {
  NEST_PORT: get('NEST_PORT').default(3000).asInt(),
  NEST_PRODUCTION: get('NEST_PRODUCTION').default('false').asBool(),
  MYSQL_PORT: get('MYSQL_PORT').required().asInt(),
  MYSQL_HOST: get('MYSQL_HOST').required().asString(),
  MYSQL_USERNAME: get('MYSQL_USERNAME').required().asString(),
  MYSQL_PASSWORD: get('MYSQL_PASSWORD').default('').asString(),
  MYSQL_DATABASE: get('MYSQL_DATABASE').required().asString(),
  MYSQL_SYNCRONIZE: get('MYSQL_SYNCRONIZE').default('true').asBool()
}
