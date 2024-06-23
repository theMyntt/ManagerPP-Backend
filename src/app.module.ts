import { Module } from '@nestjs/common'
import { env } from './config/env'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user/infra/entities/user.entity'
import { UserModule } from './user/infra/user.module'
import { CorporationModule } from './corporation/infra/corporation.module'
import { CorporationEntity } from './corporation/infra/entities/corporation.entity'

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
        entities: [UserEntity, CorporationEntity],
        synchronize: env.MYSQL_SYNCRONIZE
      }),
      inject: []
    }),
    UserModule,
    CorporationModule
  ],
  controllers: []
})
export class AppModule {}
