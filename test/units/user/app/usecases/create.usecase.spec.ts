import { Test, TestingModule } from '@nestjs/testing'
import { CreateUseCase } from '@src/user/app/usecases/create.usecase'
import { UserService } from '@src/user/domain/services/user.service'
import { CreateUserDTO } from '@src/user/infra/dto/create.dto'

jest.mock('@shared/utils/uuid.util', () => ({
  UUID: { generate: jest.fn(() => 'generated-uuid') }
}))

jest.mock('@shared/utils/string.util', () => ({
  StringUtil: { generate: jest.fn(() => 'generated-access-code') }
}))

describe('CreateUseCase', () => {
  let createUseCase: CreateUseCase
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUseCase,
        {
          provide: UserService,
          useValue: {
            create: jest.fn()
          }
        }
      ]
    }).compile()

    createUseCase = module.get<CreateUseCase>(CreateUseCase)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(createUseCase).toBeDefined()
  })

  it('should create a user successfully', async () => {
    const dto: CreateUserDTO = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    }

    userService.create = jest.fn().mockResolvedValue(true)

    const result = await createUseCase.run(dto)

    expect(userService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'generated-uuid',
        access_code: 'generated-access-code',
        email: 'test@example.com',
        password: 'password123',
        name: 'TEST USER'
      })
    )

    expect(result).toEqual({
      message: 'User created',
      statusCode: 200,
      access_code: 'generated-access-code'
    })
  })

  it('should return an error if user already exists', async () => {
    const dto: CreateUserDTO = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    }

    userService.create = jest.fn().mockResolvedValue(false)

    const result = await createUseCase.run(dto)

    expect(userService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com'
      })
    )

    expect(result).toEqual({
      message: 'User already exists',
      statusCode: 409
    })
  })
})
