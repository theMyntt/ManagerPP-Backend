import { IResult } from '@shared/core/result.core'

export interface IErrorContract {
  new: () => IResult
}
