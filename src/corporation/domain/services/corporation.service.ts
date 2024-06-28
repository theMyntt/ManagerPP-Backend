import { Inject, Injectable } from '@nestjs/common'
import { DeleteCorporationDTO } from '@src/corporation/infra/dto/delete.dto'
import { CorporationEntity } from '@src/corporation/infra/entities/corporation.entity'
import { CorporationRepository } from '@src/corporation/infra/repositories/corporation.repository'

@Injectable()
export class CorporationService {
  constructor(
    @Inject('I_CORPORATION_REPOSITORY')
    private readonly repo: CorporationRepository<CorporationEntity | any>
  ) {}

  async create(dto: CorporationEntity): Promise<boolean> {
    if (await this.repo.find({ email: dto.email, name: dto.name })) return false

    await this.repo.create(dto)
    return true
  }

  async delete(dto: DeleteCorporationDTO): Promise<boolean> {
    const data = await this.repo.find(dto)

    if (!data) return false

    try {
      await this.repo.delete(data)
      return true
    } catch {
      return false
    }
  }
}
