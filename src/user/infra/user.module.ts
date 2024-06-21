import { Module } from '@nestjs/common'
import { UserRepository } from './repositories/user.repository'
import { UserEntity } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateUseCase } from '../app/usecases/create.usecase'
import { UserService } from '../domain/services/user.service'
import { CreateController } from './controllers/create.controller'
import { LoginUseCase } from '../app/usecases/login.usecase'
import { LoginController } from './controllers/login.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [CreateController, LoginController],
  providers: [
    { provide: 'I_USER_REPOSITORY', useClass: UserRepository },
    { provide: 'I_USER_ENTITY', useClass: UserEntity },
    { provide: 'I_CREATE_USECASE', useClass: CreateUseCase },
    { provide: 'I_LOGIN_USECASE', useClass: LoginUseCase },
    UserService
  ]
})
export class UserModule {}
