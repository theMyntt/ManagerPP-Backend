import { IResult } from '@shared/domain/core/result.core'

export interface IErrorContract {
  new: () => IResult
}
