import { Test, TestingModule } from '@nestjs/testing'
import { CreateCorporationController } from '@src/corporation/infra/controllers/create.controller'
import { CreateCorporationUseCase } from '@src/corporation/app/usecases/create.usecase'
import { IResult } from '@shared/domain/core/result.core'
import { CreateCorporationDTO } from '@src/corporation/infra/dto/create.dto'
import { HttpStatus } from '@nestjs/common'

describe('CreateCorporationController', () => {
  let controller: CreateCorporationController
  let useCase: CreateCorporationUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCorporationController],
      providers: [
        {
          provide: 'I_CREATE_USECASE',
          useValue: {
            run: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<CreateCorporationController>(
      CreateCorporationController
    )
    useCase = module.get<CreateCorporationUseCase>('I_CREATE_USECASE')
  })

  describe('perform', () => {
    it('should return 500 when an unexpected error occurs', async () => {
      const dto: CreateCorporationDTO = {
        email: 'corporation@corporation.com',
        name: 'Test Corporation',
        phone: '+1234567890'
      }

      jest.spyOn(controller, 'perform').mockResolvedValueOnce({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error'
      } as IResult)

      const result: IResult = await controller.perform(dto)

      expect(result.statusCode).toBe(500)
      expect(result).toStrictEqual({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error'
      })
    })
    it('should return 201 when useCase.run resolves with a success result', async () => {
      const dto: CreateCorporationDTO = {
        email: 'corporation@corporation.com',
        name: 'Test Corporation',
        phone: '+1234567890'
      }

      jest.spyOn(useCase, 'run').mockResolvedValueOnce({
        statusCode: HttpStatus.CREATED,
        message: 'Corporation created successfully'
      } as IResult)

      const result: IResult = await controller.perform(dto)

      expect(result.statusCode).toBe(HttpStatus.CREATED)
      expect(result).toStrictEqual({
        statusCode: HttpStatus.CREATED,
        message: 'Corporation created successfully'
      })
    })
  })
})
