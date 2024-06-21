import { Module } from '@nestjs/common'
import { UserRepository } from './repositories/user.repository'
import { UserEntity } from './database/orm/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [
    { provide: 'I_USER_REPOSITORY', useClass: UserRepository },
    { provide: 'I_USER_ENTITY', useClass: UserEntity }
  ]
})
export class UserModule {}
