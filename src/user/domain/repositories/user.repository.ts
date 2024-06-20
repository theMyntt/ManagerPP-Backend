import { IRepositoryContract } from '@shared/contracts/repository.contract'

export interface IUserRepository<I, O> extends IRepositoryContract<I, O> {
  create(dto: I): Promise<O>
  find(dto: I): Promise<O>
  update(dto: I): Promise<O>
  delete(dto: I): Promise<O>
}
