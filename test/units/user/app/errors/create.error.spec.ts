import {
  InvalidInformations,
  AlreadyExists
} from '@src/user/app/errors/create.error'
import { IResult } from '@shared/domain/core/result.core'

describe('Error Classes', () => {
  describe('AlreadyExists', () => {
    it('should return the correct error result', () => {
      const errorInstance = new AlreadyExists()
      const result: IResult = errorInstance.new()

      expect(result).toEqual({
        message: 'User already exists',
        statusCode: 400
      })
    })
  })

  describe('InvalidInformations', () => {
    it('should return the correct error result', () => {
      const errorInstance = new InvalidInformations()
      const result: IResult = errorInstance.new()

      expect(result).toEqual({
        message: 'Invalid informations',
        statusCode: 400
      })
    })
  })
})
