import { Test, TestingModule } from '@nestjs/testing'
import { LoginController } from '@src/user/infra/controllers/login.controller'
import { LoginUseCase } from '@src/user/app/usecases/login.usecase'
import { LoginUserDTO } from '@src/user/infra/dto/login.dto'
import { InternalServerError } from '@shared/errors/common.error'
import { ILoginResponse } from '@src/user/app/usecases/login.usecase'
import { IResult } from '@shared/core/result.core'

describe('LoginController', () => {
  let controller: LoginController
  let loginUseCase: LoginUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: 'I_LOGIN_USECASE',
          useValue: {
            run: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<LoginController>(LoginController)
    loginUseCase = module.get<LoginUseCase>('I_LOGIN_USECASE')
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return login response on success', async () => {
    const dto: LoginUserDTO = {
      access_code: 'validCode',
      password: 'validPassword'
    }
    const response: ILoginResponse = {
      tokens: ['validToken'],
      name: 'validName',
      accessCode: 'validCode',
      statusCode: 200
    }

    jest.spyOn(loginUseCase, 'run').mockResolvedValue(response)

    const result = await controller.perform(dto)

    expect(loginUseCase.run).toHaveBeenCalledWith(dto)
    expect(result).toEqual(response)
  })

  it('should return InternalServerError on exception', async () => {
    const dto: LoginUserDTO = {
      access_code: 'validCode',
      password: 'validPassword'
    }

    jest.spyOn(loginUseCase, 'run').mockImplementation(() => {
      throw new Error()
    })

    const result = await controller.perform(dto)

    expect(result).toEqual(new InternalServerError().new())
  })
})
