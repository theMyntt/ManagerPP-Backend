import { Test, TestingModule } from '@nestjs/testing'
import { DeleteCorporationController } from '@src/corporation/infra/controllers/delete.controller'
import { DeleteCorporationUseCase } from '@src/corporation/app/usecases/delete.usecase'
import { DeleteCorporationDTO } from '@src/corporation/infra/dto/delete.dto'
import { AuthMiddleware } from '@shared/infra/middlewares/auth.middleware'
import { IResult } from '@shared/domain/core/result.core'

describe('DeleteCorporationController', () => {
  let controller: DeleteCorporationController
  let useCase: DeleteCorporationUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteCorporationController],
      providers: [
        {
          provide: 'I_DELETE_USECASE',
          useValue: {
            run: jest.fn()
          }
        }
      ]
    })
      .overrideGuard(AuthMiddleware)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile()

    controller = module.get<DeleteCorporationController>(
      DeleteCorporationController
    )
    useCase = module.get<DeleteCorporationUseCase>('I_DELETE_USECASE')
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call useCase.run with correct DTO', async () => {
    const email = 'test@example.com'
    const dto = new DeleteCorporationDTO()
    dto.email = email

    await controller.perform(email)

    expect(useCase.run).toHaveBeenCalledWith(dto)
  })

  it('should return the result from useCase.run', async () => {
    const result: IResult = { statusCode: 201, message: 'Corporation deleted' }
    ;(useCase.run as jest.Mock).mockResolvedValue(result)

    const email = 'test@example.com'
    const response = await controller.perform(email)

    expect(response).toEqual(result)
  })

  it('should handle not found error correctly', async () => {
    const errorResult: IResult = {
      statusCode: 404,
      message: 'Corporation not found'
    }
    ;(useCase.run as jest.Mock).mockResolvedValue(errorResult)

    const email = 'nonexistent@example.com'
    const response = await controller.perform(email)

    expect(response).toEqual(errorResult)
  })
})
