import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IControllerContract } from '@shared/domain/contracts/controller.contract'
import { IResult } from '@shared/domain/core/result.core'
import { LoginUserDTO } from '@src/user/infra/dto/login.dto'
import {
  ILoginResponse,
  LoginUseCase
} from '@src/user/app/usecases/login.usecase'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('user')
@ApiTags('User Management')
export class LoginController
  implements IControllerContract<LoginUserDTO, ILoginResponse | IResult>
{
  constructor(
    @Inject('I_LOGIN_USECASE')
    private readonly useCase: LoginUseCase
  ) {}

  @Post('v1/login')
  @ApiResponse({ status: 201, description: 'The user has been found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async perform(@Body() dto: LoginUserDTO): Promise<ILoginResponse | IResult> {
    return this.useCase.run(dto)
  }
}
