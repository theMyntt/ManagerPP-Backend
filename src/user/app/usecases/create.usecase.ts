import { IUseCaseContract } from '@shared/domain/contracts/usecase.contract'
import { CreateUserDTO } from '../../infra/dto/create.dto'
import { IResult } from '@shared/domain/core/result.core'
import { Inject } from '@nestjs/common'
import { UserService } from '@src/user/domain/services/user.service'
import { InvalidInformations } from '../errors/create.error'
import { UserEntity } from '@src/user/infra/entities/user.entity'
import { UUID } from '@shared/utils/uuid.util'
import { StringUtil } from '@shared/utils/string.util'

export type TCreateUserResponse = IResult & {
  access_code: string
}

export class CreateUseCase
  implements IUseCaseContract<CreateUserDTO, TCreateUserResponse | IResult>
{
  constructor(
    @Inject(UserService)
    private readonly service: UserService
  ) {}

  async run(dto: CreateUserDTO): Promise<TCreateUserResponse | IResult> {
    const entity = new UserEntity()

    entity.id = UUID.generate()
    entity.access_code = StringUtil.generate()
    entity.email = dto.email.toLowerCase()
    entity.password = dto.password
    entity.name = dto.name.toUpperCase()
    entity.createdAt = new Date()
    entity.updatedAt = new Date()

    const brute = await this.service.create(entity)

    if (!brute) {
      return {
        message: 'User already exists',
        statusCode: 409
      }
    }

    return {
      message: 'User created',
      statusCode: 200,
      access_code: entity.access_code
    }
  }
}
