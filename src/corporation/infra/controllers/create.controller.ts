import { Controller, Inject, UseGuards } from '@nestjs/common'
import { IControllerContract } from '@shared/domain/contracts/controller.contract'
import { CorporationEntity } from '../entities/corporation.entity'
import { IResult } from '@shared/domain/core/result.core'
import { CreateCorporationUseCase } from '@src/corporation/app/usecases/create.usecase'
import { InternalServerError } from '@shared/infra/errors/common.error'
import { AuthMiddleware } from '@shared/infra/middlewares/auth.middleware'

@Controller('corporation')
@UseGuards(AuthMiddleware)
export class CorporationController
  implements IControllerContract<CorporationEntity, IResult>
{
  constructor(
    @Inject('I_CREATE_USECASE')
    private readonly useCase: CreateCorporationUseCase
  ) {}

  async perform(dto: CorporationEntity): Promise<IResult> {
    try {
      return await this.useCase.run(dto)
    } catch (err) {
      return new InternalServerError().new()
    }
  }
}
