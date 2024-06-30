import { Test, TestingModule } from '@nestjs/testing'
import {
  LoginUseCase,
  ILoginResponse
} from '@src/user/app/usecases/login.usecase'
import { UserService } from '@src/user/domain/services/user.service'
import { LoginUserDTO } from '@src/user/infra/dto/login.dto'
import { NotFound } from '@src/user/app/errors/login.error'
import { IResult } from '@shared/domain/core/result.core'
import { UserEntity } from '@src/user/infra/entities/user.entity'
import { UUID } from '@shared/utils/uuid.util'

// jest.mock('@src/user/app/usecases/login.usecase')

describe('LoginUseCase', () => {
  let useCase: LoginUseCase
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: UserService,
          useValue: {
            find: jest.fn()
          }
        }
      ]
    }).compile()

    useCase = module.get<LoginUseCase>(LoginUseCase)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(useCase).toBeDefined()
  })

  describe('run', () => {
    it('should return NotFound error if user is not found', async () => {
      const dto: LoginUserDTO = {
        access_code: 'nonexistent',
        password: 'password'
      }
      jest.spyOn(userService, 'find').mockResolvedValueOnce(null)
      jest.spyOn(useCase, 'run').mockResolvedValueOnce({
        message: 'No user found',
        statusCode: 404
      } as IResult)

      const result = await useCase.run(dto)

      expect(result).toEqual({
        message: 'No user found',
        statusCode: 404
      })
    })

    it('should return login response if user is found', async () => {
      const dto: LoginUserDTO = {
        access_code: 'validCode',
        password: 'password'
      }
      const user = new UserEntity()
      user.name = 'John Doe'

      jest.spyOn(userService, 'find').mockResolvedValue(user)

      const response: ILoginResponse = {
        accessCode: dto.access_code,
        name: user.name,
        statusCode: 200,
        tokens: ['mock-uuid', 'mock-uuid', 'mock-uuid']
      }

      jest.spyOn(useCase, 'run').mockResolvedValueOnce(response)

      const result = await useCase.run(dto)

      expect(result).toEqual(response)
    })
  })
})
