import { Module } from '@nestjs/common'
import { env } from './config/env'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user/infra/entities/user.entity'
import { UserModule } from './user/infra/user.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: () => ({
        type: 'mysql',
        host: env.MYSQL_HOST,
        port: env.MYSQL_PORT,
        username: env.MYSQL_USERNAME,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DATABASE,
        entities: [UserEntity],
        synchronize: env.MYSQL_SYNCRONIZE
      }),
      inject: []
    }),
    UserModule
  ],
  controllers: []
})
export class AppModule {}
