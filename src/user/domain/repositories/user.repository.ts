import { IRepositoryContract } from '@shared/domain/contracts/repository.contract'
import { UserEntity } from '@src/user/infra/entities/user.entity'

export interface IUserRepository<I, O>
  extends IRepositoryContract<I, O | UserEntity | Array<UserEntity>> {
  create(dto: I): Promise<O>
  find(dto: I): Promise<UserEntity>
  update(dto: I): Promise<O>
  delete(dto: I): Promise<O>
}
