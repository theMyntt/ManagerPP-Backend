import { IErrorContract } from '@shared/contracts/error.contract'
import { IResult } from '@shared/core/result.core'

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
