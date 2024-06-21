import { IRepositoryContract } from '@shared/contracts/repository.contract'
import { UserEntity } from '@src/user/infra/database/orm/user.entity'

export interface IUserRepository<I, O>
  extends IRepositoryContract<I, O | UserEntity | Array<UserEntity>> {
  create(dto: I): Promise<O>
  find(dto: I): Promise<UserEntity>
  update(dto: I): Promise<O>
  delete(dto: I): Promise<O>
}
