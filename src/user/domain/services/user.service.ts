import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '@src/user/infra/repositories/user.repository'
import { IResult } from '@shared/core/result.core'
import { UserEntity } from '@src/user/infra/database/orm/user.entity'
import { LoginUserDTO } from '@src/user/app/dto/login.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject('I_USER_REPOSITORY')
    private readonly repo: UserRepository<UserEntity | any>
  ) {}

  async create(dto: UserEntity): Promise<IResult> {
    if (await this.repo.find({ email: dto.email }))
      return {
        message: 'User already exists',
        statusCode: 409
      }

    await this.repo.create(dto)

    return {
      message: 'User created',
      statusCode: 200
    }
  }

  async find(dto: LoginUserDTO): Promise<UserEntity> {
    return await this.repo.find(dto)
  }
}
