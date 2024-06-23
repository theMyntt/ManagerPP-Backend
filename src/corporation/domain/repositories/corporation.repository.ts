import { IRepositoryContract } from '@shared/domain/contracts/repository.contract'
import { CorporationEntity } from '@src/corporation/infra/entities/corporation.entity'

export interface ICorporationRepository<I, O>
  extends IRepositoryContract<
    I | CorporationEntity,
    O | CorporationEntity | Array<CorporationEntity>
  > {
  create(dto: I): Promise<O>
  find(dto: I): Promise<CorporationEntity>
  update(dto: CorporationEntity): Promise<O>
  delete(dto: I): Promise<O>
}
