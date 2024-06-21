import { env } from '@config/env'
import {
  DynamicModule,
  ForwardReference,
  INestApplication,
  Type,
  ValidationPipe
} from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'

type Modules =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference<any>

export async function AppModuleMock(
  modules: Array<Modules>,
  entities: Array<Function | string>
): Promise<{ app: INestApplication; module: TestingModule }> {
  let app: INestApplication

  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ...modules,
      TypeOrmModule.forRootAsync({
        imports: [],
        useFactory: () => ({
          type: 'mysql',
          host: env.MYSQL_HOST,
          port: env.MYSQL_PORT,
          username: env.MYSQL_USERNAME,
          password: env.MYSQL_PASSWORD,
          database: env.MYSQL_DATABASE,
          entities: [...entities],
          synchronize: env.MYSQL_SYNCRONIZE
        }),
        inject: []
      })
    ]
  }).compile()

  app = module.createNestApplication()
  app.useGlobalPipes(new ValidationPipe())

  return {
    app,
    module
  }
}
