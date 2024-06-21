import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IControllerContract } from '@shared/contracts/controller.contract'
import { IResult } from '@shared/core/result.core'
import { InternalServerError } from '@shared/errors/common.error'
import { LoginUserDTO } from '@src/user/app/dto/login.dto'
import {
  ILoginResponse,
  LoginUseCase
} from '@src/user/app/usecases/login.usecase'

@Controller('user')
export class LoginController
  implements IControllerContract<LoginUserDTO, ILoginResponse | IResult>
{
  constructor(
    @Inject('I_LOGIN_USECASE')
    private readonly useCase: LoginUseCase
  ) {}

  @Post('v1/login')
  async perform(@Body() dto: LoginUserDTO): Promise<ILoginResponse | IResult> {
    try {
      return this.useCase.run(dto)
    } catch {
      return new InternalServerError().new()
    }
  }
}
