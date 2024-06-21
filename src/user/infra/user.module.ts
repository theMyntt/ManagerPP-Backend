import { Module } from '@nestjs/common'
import { UserRepository } from './repositories/user.repository'
import { UserEntity } from './database/orm/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateUseCase } from '../app/usecases/create.usecase'
import { UserService } from '../domain/services/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [
    { provide: 'I_USER_REPOSITORY', useClass: UserRepository },
    { provide: 'I_USER_ENTITY', useClass: UserEntity },
    { provide: 'I_CREATE_USECASE', useClass: CreateUseCase },
    UserService
  ]
})
export class UserModule {}
