import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '@src/user/infra/repositories/user.repository'
import { UserEntity } from '@src/user/infra/entities/user.entity'
import { LoginUserDTO } from '@src/user/infra/dto/login.dto'

@Injectable()
export class UserService {
  constructor(
    @Inject('I_USER_REPOSITORY')
    private readonly repo: UserRepository<UserEntity | any>
  ) {}

  async create(dto: UserEntity): Promise<boolean> {
    if (await this.repo.find({ email: dto.email })) return false

    await this.repo.create(dto)
    return true
  }

  async find(dto: LoginUserDTO): Promise<UserEntity> {
    return await this.repo.find(dto)
  }
}
