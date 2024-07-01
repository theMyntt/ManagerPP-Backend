import { IUseCaseContract } from '@shared/domain/contracts/usecase.contract'
import { LoginUserDTO } from '../../infra/dto/login.dto'
import { IResult } from '@shared/domain/core/result.core'
import { UserService } from '@src/user/domain/services/user.service'
import { Inject } from '@nestjs/common'
import { NotFound } from '../errors/login.error'
import { UUID } from '@shared/utils/uuid.util'

export interface ILoginResponse {
  tokens: Array<string>
  name: string
  accessCode: string
  statusCode: number
}

export class LoginUseCase
  implements IUseCaseContract<LoginUserDTO, ILoginResponse | IResult>
{
  constructor(
    @Inject(UserService)
    private readonly service: UserService
  ) {}

  async run(dto: LoginUserDTO): Promise<ILoginResponse | IResult> {
    const user = await this.service.find(dto)
    if (!user) return new NotFound().new()

    const response: ILoginResponse = {
      accessCode: dto.access_code,
      name: user.name,
      statusCode: 200,
      tokens: [UUID.generate(), UUID.generate(), UUID.generate()]
    }

    return response
  }
}
