import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { env } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(env.NEST_PORT)

  Logger.log(`Application running at localhost:${env.NEST_PORT}`)
  Logger.log(
    `================================= ${env.NEST_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT'} =================================`
  )
  Logger.log(`MySQL connected at: ${env.MYSQL_HOST}:${env.MYSQL_PORT}`)
  Logger.log(`MySQL database: ${env.MYSQL_DATABASE}`)
  Logger.log(`MySQL connected user: ${env.MYSQL_USERNAME}`)
}
bootstrap()
