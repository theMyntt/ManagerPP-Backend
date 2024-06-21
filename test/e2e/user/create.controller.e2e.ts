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

  beforeEach(async () => {
    await userEntity.delete({})
  })

  afterAll(async () => {
    await app.close()
  })

  describe('perform', () => {
    it('should return a failure if the dto is invalid', async () => {
      await request(app.getHttpServer())
        .post('/user/v1/new')
        .send({})
        .expect({
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
        .expect(400)
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

    it('should not allow create a user if he already exists', async () => {
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

      expect(body.message).toBe('User already exists')
      expect(body.statusCode).toBe(409)
    })
  })
})
