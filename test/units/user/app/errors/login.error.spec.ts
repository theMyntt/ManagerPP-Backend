import { IResult } from '@shared/domain/core/result.core'
import { NotFound } from '@src/user/app/errors/login.error'

describe('NotFound', () => {
  it('should return the correct error result', () => {
    const result: IResult = {
      message: 'No user found',
      statusCode: 404
    }

    expect(result).toEqual({
      message: 'No user found',
      statusCode: 404
    })
  })
})
