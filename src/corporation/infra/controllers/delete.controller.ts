import { IControllerContract } from '@shared/domain/contracts/controller.contract'
import { DeleteCorporationDTO } from '../dto/delete.dto'
import { IResult } from '@shared/domain/core/result.core'
import { Controller, Delete, Inject, Query } from '@nestjs/common'
import { DeleteCorporationUseCase } from '@src/corporation/app/usecases/delete.usecase'

@Controller('corporation')
export class DeleteCorporationController
  implements IControllerContract<string, IResult>
{
  constructor(
    @Inject('I_DELETE_USECASE')
    private readonly useCase: DeleteCorporationUseCase
  ) {}

  @Delete('v1/delete')
  async perform(@Query('email') email: string): Promise<IResult> {
    const dto = new DeleteCorporationDTO()
    dto.email = email

    return await this.useCase.run(dto)
  }
}
