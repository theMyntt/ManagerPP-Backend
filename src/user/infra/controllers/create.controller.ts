import { Body, Controller, Inject, Post, RequestMapping } from '@nestjs/common'
import { IControllerContract } from '@shared/contracts/controller.contract'
import { IResult } from '@shared/core/result.core'
import { InternalServerError } from '@shared/errors/common.error'
import { CreateUserDTO } from '@src/user/infra/dto/create.dto'
import { CreateUseCase } from '@src/user/app/usecases/create.usecase'

@Controller('user')
export class CreateController
  implements IControllerContract<CreateUserDTO, IResult>
{
  constructor(
    @Inject('I_CREATE_USECASE')
    private readonly useCase: CreateUseCase
  ) {}

  @Post('v1/new')
  async perform(@Body() dto: CreateUserDTO): Promise<IResult> {
    try {
      return this.useCase.run(dto)
    } catch {
      return new InternalServerError().new()
    }
  }
}
