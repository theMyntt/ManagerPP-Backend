import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import env from './config/env'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [],
        synchronize: configService.get<boolean>('MYSQL_SYNCRONIZE')
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([])
  ],
  controllers: []
})
export class AppModule {}
