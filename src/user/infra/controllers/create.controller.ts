import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IControllerContract } from '@shared/domain/contracts/controller.contract'
import { IResult } from '@shared/domain/core/result.core'
import { CreateUserDTO } from '@src/user/infra/dto/create.dto'
import { CreateUseCase } from '@src/user/app/usecases/create.usecase'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('User Management')
@Controller('user')
export class CreateController
  implements IControllerContract<CreateUserDTO, IResult>
{
  constructor(
    @Inject('I_CREATE_USECASE')
    private readonly useCase: CreateUseCase
  ) {}

  @Post('v1/new')
  @ApiResponse({ status: 201, description: 'The user has been created' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async perform(@Body() dto: CreateUserDTO): Promise<IResult> {
    return this.useCase.run(dto)
  }
}
