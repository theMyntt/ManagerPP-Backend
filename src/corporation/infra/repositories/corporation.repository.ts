import { IResult } from '@shared/domain/core/result.core'
import { ICorporationRepository } from '@src/corporation/domain/repositories/corporation.repository'
import { CorporationEntity } from '../entities/corporation.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InternalServerErrorException } from '@nestjs/common'

export class CorporationRepository<I>
  implements ICorporationRepository<I, IResult | CorporationEntity>
{
  constructor(
    @InjectRepository(CorporationEntity)
    private readonly schema: Repository<CorporationEntity>
  ) {}

  async create(dto: I): Promise<IResult | CorporationEntity> {
    await this.schema.save(dto)

    return {
      message: 'Corporation succefully registered',
      statusCode: 201
    }
  }
  async find(dto: I): Promise<CorporationEntity> {
    try {
      return await this.schema.findOne({ where: dto })
    } catch (error) {
      throw new InternalServerErrorException('Error finding corporation')
    }
  }
  async update(dto: CorporationEntity): Promise<IResult | CorporationEntity> {
    await this.schema.update(dto.id, dto)
    return {
      message: 'Corporation succefully updated',
      statusCode: 200
    }
  }
  async delete(dto: I): Promise<IResult | CorporationEntity> {
    await this.schema.delete(dto)

    return {
      message: 'Corporation succefully deleted',
      statusCode: 200
    }
  }
  findAll(
    dto: I,
    limit: number
  ): Promise<IResult | CorporationEntity | CorporationEntity[]> {
    return this.schema.find({ where: dto, take: limit })
  }
}
