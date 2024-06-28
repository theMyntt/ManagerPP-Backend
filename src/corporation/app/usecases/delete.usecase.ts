import { Inject } from '@nestjs/common'
import { IUseCaseContract } from '@shared/domain/contracts/usecase.contract'
import { IResult } from '@shared/domain/core/result.core'
import { CorporationService } from '@src/corporation/domain/services/corporation.service'
import { DeleteCorporationDTO } from '@src/corporation/infra/dto/delete.dto'
import { CorporationEntity } from '@src/corporation/infra/entities/corporation.entity'
import { CannotFind } from '../errors/delete.error'

export class DeleteCorporationUseCase
  implements IUseCaseContract<DeleteCorporationDTO, IResult>
{
  constructor(
    @Inject(CorporationService)
    private readonly service: CorporationService
  ) {}
  async run(dto: DeleteCorporationDTO): Promise<IResult> {
    const del = await this.service.delete(dto)

    if (!del) throw new CannotFind()

    return {
      message: 'Corporation deleted',
      statusCode: 200
    }
  }
}
