import { IErrorContract } from '@shared/domain/contracts/error.contract'
import { IResult } from '@shared/domain/core/result.core'

export class AlreadyExists implements IErrorContract {
  new(): IResult {
    return {
      message: 'User already exists',
      statusCode: 400
    }
  }
}

export class InvalidInformations implements IErrorContract {
  new(): IResult {
    return {
      message: 'Invalid informations',
      statusCode: 400
    }
  }
}
