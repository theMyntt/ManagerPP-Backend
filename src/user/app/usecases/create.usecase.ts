import { IUseCaseContract } from '@shared/contracts/usecase.contract'
import { CreateUserDTO } from '../dto/create.dto'
import { IResult } from '@shared/core/result.core'
import { Inject } from '@nestjs/common'
import { UserService } from '@src/user/domain/services/user.service'
import { InvalidInformations } from '../errors/create.error'
import { UserEntity } from '@src/user/infra/database/orm/user.entity'
import { UUID } from '@shared/utils/uuid.util'

export class CreateUseCase implements IUseCaseContract<CreateUserDTO, IResult> {
  constructor(
    @Inject(UserService)
    private readonly service: UserService
  ) {}

  async run(dto: CreateUserDTO): Promise<IResult> {
    for (let element in dto) {
      if (element == null) {
        return new InvalidInformations().new()
      }
    }

    const entity = new UserEntity()

    entity.id = UUID.generate()
    entity.email = dto.email.toLowerCase()
    entity.password = dto.password
    entity.name = dto.name.toUpperCase()
    entity.createdAt = new Date()
    entity.updatedAt = new Date()

    return this.service.create(entity)
  }
}
