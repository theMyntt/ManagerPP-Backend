import { INestApplication } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from '@src/user/infra/entities/user.entity'
import { UserModule } from '@src/user/infra/user.module'
import { Repository } from 'typeorm'
import { AppModuleMock } from '../mock.module'
import * as request from 'supertest'

describe('[POST] - /user/v1/new', () => {
  let app: INestApplication
  let userEntity: Repository<UserEntity>

  beforeAll(async () => {
    const { app: appMock, module } = await AppModuleMock(
      [UserModule],
      [UserEntity]
    )
    app = appMock
    await app.init()

    userEntity = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    )
  })

  afterAll(async () => {
    await app.close()
  })

  describe('perform', () => {
    beforeEach(async () => {
      await userEntity.clear() // Use `clear` to remove all records
    })

    it('should return a failure if the dto is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/user/v1/new')
        .send({})
        .expect(400)

      expect(response.body).toEqual({
        message: [
          'name must be a string',
          'name should not be empty',
          'email must be a string',
          'email should not be empty',
          'password must be a string',
          'password should not be empty'
        ],
        error: 'Bad Request',
        statusCode: 400
      })
    })

    it('should register a new user', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/user/v1/new')
        .send({
          name: 'valid_name',
          email: 'valid_email',
          password: 'valid_password'
        })
        .expect(201)

      expect(body.message).toBe('User created')
      expect(body.access_code).toBeDefined()
      expect(typeof body.access_code).toBe('string')
    })

    it('should not allow creating a user if they already exist', async () => {
      await userEntity.insert({
        id: 'valid_id',
        access_code: 'valid_access_code',
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const { body } = await request(app.getHttpServer())
        .post('/user/v1/new')
        .send({
          name: 'valid_name',
          email: 'valid_email',
          password: 'valid_password'
        })
        .expect(409)

      expect(body.message).toBe('We cant create this user')
      expect(body.statusCode).toBe(409)
    })
  })
})
