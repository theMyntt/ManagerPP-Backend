import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserRepository } from '@src/user/infra/repositories/user.repository'
import { UserEntity } from '@src/user/infra/entities/user.entity'
import { IResult } from '@shared/core/result.core'

describe('UserRepository', () => {
  let repository: UserRepository<any>
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository
        }
      ]
    }).compile()

    repository = module.get<UserRepository<any>>(UserRepository)
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    )
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('create', () => {
    it('should save a user and return success message', async () => {
      const dto = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password'
      }

      jest.spyOn(userRepository, 'save').mockResolvedValue(dto as any)

      const result: IResult = await repository.create(dto)

      expect(userRepository.save).toHaveBeenCalledWith(dto)
      expect(result).toEqual({
        message: 'User succefully registered',
        statusCode: 201
      })
    })
  })

  describe('find', () => {
    it('should find a user by criteria', async () => {
      const dto = { id: '1' }
      const user = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password'
      }

      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(user as UserEntity)

      const result: UserEntity = await repository.find(dto)

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: dto })
      expect(result).toEqual(user)
    })
  })
})
