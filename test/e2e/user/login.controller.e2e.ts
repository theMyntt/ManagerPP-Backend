import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { ILoginResponse } from '@src/user/app/usecases/login.usecase'
import { IResult } from '@shared/domain/core/result.core'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AppModuleMock } from '../mock.module'
import { UserModule } from '@src/user/infra/user.module'
import { UserEntity } from '@src/user/infra/entities/user.entity'
import { Repository } from 'typeorm'
import { faker } from '@faker-js/faker'

describe('[POST] - /user/v1/login', () => {
  let app: INestApplication

  let userEntity: Repository<UserEntity>

  const date = new Date()

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
    await userEntity.delete({})
    await app.close()
  })

  describe('perform', () => {
    it('should return login response', async () => {
      await userEntity.delete({})
      userEntity.save({
        createdAt: date,
        updatedAt: date,
        id: faker.string.uuid(),
        access_code: 'valid_access_code',
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
      })

      const dto = {
        access_code: 'valid_access_code',
        password: 'valid_password'
      }

      const response = await request(app.getHttpServer())
        .post('/user/v1/login')
        .send(dto)
        .expect(201)

      const body: ILoginResponse | IResult = response.body

      expect(body).toHaveProperty('tokens')
      expect(body).toHaveProperty('name')
      expect(body).toHaveProperty('accessCode')
      expect(body).toHaveProperty('statusCode')
    })

    it('should return a error if the dto is invalid', async () => {
      const dto = {
        access_code: 'invalid_access_code'
      }

      const response = await request(app.getHttpServer())
        .post('/user/v1/login')
        .send(dto)
        .expect({
          message: [
            'password must be a string',
            'password should not be empty'
          ],
          error: 'Bad Request',
          statusCode: 400
        })
        .expect(400)
    })
  })
})
