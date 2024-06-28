import { IControllerContract } from '@shared/domain/contracts/controller.contract'
import { DeleteCorporationDTO } from '../dto/delete.dto'
import { IResult } from '@shared/domain/core/result.core'
import { Controller, Delete, Inject, Query, UseGuards } from '@nestjs/common'
import { DeleteCorporationUseCase } from '@src/corporation/app/usecases/delete.usecase'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthMiddleware } from '@shared/infra/middlewares/auth.middleware'

@Controller('corporation')
@UseGuards(AuthMiddleware)
@ApiTags('Corporation Management')
export class DeleteCorporationController
  implements IControllerContract<string, IResult>
{
  constructor(
    @Inject('I_DELETE_USECASE')
    private readonly useCase: DeleteCorporationUseCase
  ) {}

  @Delete('v1/delete')
  @ApiBearerAuth('authorization')
  @ApiResponse({ status: 201, description: 'Corporation successfuly deleted' })
  @ApiResponse({ status: 404, description: 'Corporation not found' })
  async perform(@Query('email') email: string): Promise<IResult> {
    const dto = new DeleteCorporationDTO()
    dto.email = email

    return await this.useCase.run(dto)
  }
}
