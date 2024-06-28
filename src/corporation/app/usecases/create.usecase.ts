import { Inject } from '@nestjs/common'
import { IUseCaseContract } from '@shared/domain/contracts/usecase.contract'
import { IResult } from '@shared/domain/core/result.core'
import { CorporationService } from '@src/corporation/domain/services/corporation.service'
import { CreateCorporationDTO } from '@src/corporation/infra/dto/create.dto'
import { CorporationEntity } from '@src/corporation/infra/entities/corporation.entity'
import { UUID } from '@utils/uuid.util'
import { CantCreate } from '../errors/create.error'

export class CreateCorporationUseCase
  implements IUseCaseContract<CreateCorporationDTO, IResult>
{
  constructor(
    @Inject(CorporationService)
    private readonly service: CorporationService
  ) {}
  async run(dto: CreateCorporationDTO): Promise<IResult> {
    const entity = new CorporationEntity()

    entity.id = UUID.generate()
    entity.name = dto.name
    entity.email = dto.email
    entity.phone = dto.phone

    const brute = await this.service.create(entity)
    if (!brute) throw new CantCreate()

    return {
      message: 'Corporation succefully registered',
      statusCode: 201
    }
  }
}
