import { HttpException } from '@nestjs/common'
import { IErrorContract } from '@shared/domain/contracts/error.contract'
import { IResult } from '@shared/domain/core/result.core'

export class NotFound implements IErrorContract {
  new(): IResult {
    throw new HttpException(
      {
        message: 'No user found',
        statusCode: 404
      },
      404
    )
  }
}
