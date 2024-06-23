import { IResult } from '@shared/domain/core/result.core'
import { NotFound } from '@src/user/app/errors/login.error'

describe('NotFound', () => {
  it('should return the correct error result', () => {
    const errorInstance = new NotFound()
    const result: IResult = errorInstance.new()

    expect(result).toEqual({
      message: 'No user found',
      statusCode: 404
    })
  })
})
