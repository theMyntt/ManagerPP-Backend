import { IErrorContract } from '@shared/contracts/error.contract'
import { IResult } from '@shared/core/result.core'

export class NotFound implements IErrorContract {
  new(): IResult {
    return {
      message: 'No user found',
      statusCode: 404
    }
  }
}
