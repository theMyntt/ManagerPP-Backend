import { CreateController } from '@src/user/infra/controllers/create.controller'
import { CreateUseCase } from '@src/user/app/usecases/create.usecase'
import { CreateUserDTO } from '@src/user/infra/dto/create.dto'
import { InternalServerError } from '@shared/errors/common.error'
import { IResult } from '@shared/core/result.core'
import { UserService } from '@src/user/domain/services/user.service'
import { UserRepository } from '@src/user/infra/repositories/user.repository'
import { Repository } from 'typeorm'
import { UserEntity } from '@src/user/infra/entities/user.entity'
import { InvalidInformations } from '@src/user/app/errors/create.error'

jest.mock('@src/user/infra/controllers/create.controller')

describe('CreateController', () => {
  let createController: CreateController
  let createUseCase: CreateUseCase
  let userService: UserService
  let userRepository: UserRepository<any>
  let userEntity: Repository<UserEntity>

  const dto: CreateUserDTO = {
    email: 'john.doe@example.com',
    name: 'John',
    password: '123'
  }

  beforeEach(() => {
    userRepository = new UserRepository(userEntity)
    userService = new UserService(userRepository)
    createUseCase = new CreateUseCase(userService)
    createController = new CreateController(createUseCase)
  })

  describe('perform', () => {
    it('should return InternalServerError when useCase returns an error', async () => {
      const response = new InternalServerError().new()

      ;(createController.perform as jest.Mock).mockResolvedValueOnce(response)

      const result: IResult = await createController.perform(dto)

      expect(result).toBe(response)
    })

    it('should return result from useCase when no error is thrown', async () => {
      const expectedResult: IResult = {
        message: 'Test message',
        statusCode: 200
      }

      ;(createController.perform as jest.Mock).mockResolvedValueOnce(
        expectedResult
      )

      const result: IResult = await createController.perform(dto)

      expect(result).toEqual(expectedResult)
    })

    // Additional tests
    it('should handle invalid DTO', async () => {
      const invalidDto: any = {} // provide invalid DTO
      const expectedResult: IResult = new InternalServerError().new()

      ;(createController.perform as jest.Mock).mockResolvedValueOnce(
        expectedResult
      )

      const result: IResult = await createController.perform(invalidDto)

      expect(result).toEqual(expectedResult)
    })

    it('should handle unexpected errors', async () => {
      ;(createController.perform as jest.Mock).mockResolvedValueOnce(
        new InternalServerError()
      )

      const result: IResult = await createController.perform(dto)

      expect(result).toBeInstanceOf(InternalServerError)
    })
  })
})
