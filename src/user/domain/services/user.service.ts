import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '@src/user/infra/repositories/user.repository'
import { IResult } from '@shared/core/result.core'
import { UserEntity } from '@src/user/infra/database/orm/user.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject('I_USER_REPOSITORY')
    private readonly repo: UserRepository<UserEntity>
  ) {}

  async create(dto: UserEntity): Promise<IResult> {
    if (await this.repo.find(dto)) return

    await this.repo.create(dto)

    return {
      message: 'User created',
      statusCode: 200
    }
  }
}
