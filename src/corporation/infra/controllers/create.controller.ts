import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common'
import { IControllerContract } from '@shared/domain/contracts/controller.contract'
import { CorporationEntity } from '../entities/corporation.entity'
import { IResult } from '@shared/domain/core/result.core'
import { CreateCorporationUseCase } from '@src/corporation/app/usecases/create.usecase'
import { AuthMiddleware } from '@shared/infra/middlewares/auth.middleware'
import { CreateCorporationDTO } from '../dto/create.dto'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'

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
  @ApiResponse({ status: 201, description: 'The corporation has been created' })
  @ApiResponse({ status: 409, description: 'Corporation already exists' })
  async perform(@Body() dto: CreateCorporationDTO): Promise<IResult> {
    return await this.useCase.run(dto)
  }
}
