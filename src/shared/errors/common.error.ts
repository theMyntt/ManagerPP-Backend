import { IErrorContract } from '@shared/contracts/error.contract'
import { IResult } from '@shared/core/result.core'

export class InternalServerError implements IErrorContract {
  new(): IResult {
    return {
      message: 'Internal server error, try again later',
      statusCode: 500
    }
  }
}
