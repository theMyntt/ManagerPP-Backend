import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '@src/user/domain/services/user.service'
import { UserRepository } from '@src/user/infra/repositories/user.repository'
import { UserEntity } from '@src/user/infra/entities/user.entity'
import { LoginUserDTO } from '@src/user/infra/dto/login.dto'
import { faker } from '@faker-js/faker'

describe('UserService', () => {
  let service: UserService
  let userRepository: UserRepository<UserEntity | any>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'I_USER_REPOSITORY',
          useValue: {
            find: jest.fn(),
            create: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
    userRepository =
      module.get<UserRepository<UserEntity | any>>('I_USER_REPOSITORY')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should return false if user already exists', async () => {
      const dto = new UserEntity()
      dto.email = 'test@example.com'

      jest.spyOn(userRepository, 'find').mockResolvedValue(dto)

      const result = await service.create(dto)

      expect(userRepository.find).toHaveBeenCalledWith({ email: dto.email })
      expect(result).toBe(false)
    })

    it('should create a user if it does not exist', async () => {
      const dto = new UserEntity()
      dto.email = 'test@example.com'

      jest.spyOn(userRepository, 'find').mockResolvedValue(null)
      jest.spyOn(userRepository, 'create').mockResolvedValue(undefined)

      const result = await service.create(dto)

      expect(userRepository.find).toHaveBeenCalledWith({ email: dto.email })
      expect(userRepository.create).toHaveBeenCalledWith(dto)
      expect(result).toBe(true)
    })
  })

  describe('find', () => {
    it('should return a user based on the given criteria', async () => {
      const dto: LoginUserDTO = {
        access_code: 'test@example.com',
        password: 'password123'
      }

      const user = new UserEntity()
      user.email = faker.internet.email()

      jest.spyOn(userRepository, 'find').mockResolvedValue(user)

      const result = await service.find(dto)

      expect(userRepository.find).toHaveBeenCalledWith(dto)
      expect(result).toEqual(user)
    })
  })
})
