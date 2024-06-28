import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common'
import { IControllerContract } from '@shared/domain/contracts/controller.contract'
import { CorporationEntity } from '../entities/corporation.entity'
import { IResult } from '@shared/domain/core/result.core'
import { CreateCorporationUseCase } from '@src/corporation/app/usecases/create.usecase'
import { InternalServerError } from '@shared/infra/errors/common.error'
import { AuthMiddleware } from '@shared/infra/middlewares/auth.middleware'
import { CreateCorporationDTO } from '../dto/create.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller('corporation')
@UseGuards(AuthMiddleware)
@ApiTags('Corporation Management')
export class CreateCorporationController
  implements IControllerContract<CorporationEntity, IResult>
{
  constructor(
    @Inject('I_CREATE_USECASE')
    private readonly useCase: CreateCorporationUseCase
  ) {}

  @Post('v1/new')
  @ApiBearerAuth('authorization')
  async perform(@Body() dto: CreateCorporationDTO): Promise<IResult> {
    try {
      return await this.useCase.run(dto)
    } catch (err) {
      return new InternalServerError().new()
    }
  }
}
