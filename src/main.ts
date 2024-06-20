import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(process.env.NEST_PORT)

  Logger.log(`Application running at localhost:${process.env.NEST_PORT}`)
  Logger.log(
    `================================= ${process.env.NEST_PRODUCTION === 'true' ? 'PRODUCTION' : 'DEVELOPMENT'} =================================`
  )
  Logger.log(
    `MySQL connected at: ${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}`
  )
  Logger.log(`MySQL database: ${process.env.MYSQL_DATABASE}`)
  Logger.log(`MySQL connected user: ${process.env.MYSQL_USERNAME}`)
}
bootstrap()
