import { IErrorContract } from '@shared/domain/contracts/error.contract'
import { IResult } from '@shared/domain/core/result.core'

export class InternalServerError implements IErrorContract {
  new(): IResult {
    return {
      message: 'Internal server error, try again later',
      statusCode: 500
    }
  }
}
