import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { env } from '@config/env'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  if (!env.NEST_PRODUCTION) {
    const config = new DocumentBuilder()
      .setTitle('Manager++ API')
      .setDescription('A system for employees management')
      .setVersion('0.0.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'authorization',
          in: 'header'
        },
        'authorization'
      )
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger-ui', app, document)
  }

  await app.listen(process.env.NEST_PORT)

  Logger.log(`Application running at localhost:${env.NEST_PORT}`)
  Logger.log(
    `================================= ${env.NEST_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT'} =================================`
  )

  if (!env.NEST_PRODUCTION) {
    Logger.log(`Swagger mapped at localhost:${env.NEST_PORT}/swagger-ui`)
  }

  Logger.log(`MySQL connected at: ${env.MYSQL_HOST}:${env.MYSQL_PORT}`)
  Logger.log(`MySQL database: ${env.MYSQL_DATABASE}`)
  Logger.log(`MySQL connected user: ${env.MYSQL_USERNAME}`)
}
bootstrap()
