import { IResult } from '@shared/domain/core/result.core'

describe('Error Classes', () => {
  describe('AlreadyExists', () => {
    it('should return the correct error result', () => {
      const result: IResult = {
        message: 'User already exists',
        statusCode: 400
      }

      expect(result).toEqual({
        message: 'User already exists',
        statusCode: 400
      })
    })
  })

  describe('InvalidInformations', () => {
    it('should return the correct error result', () => {
      const result: IResult = {
        message: ['Invalid informations'],
        statusCode: 400
      }

      expect(result).toEqual({
        message: ['Invalid informations'],
        statusCode: 400
      })
    })
  })
})
