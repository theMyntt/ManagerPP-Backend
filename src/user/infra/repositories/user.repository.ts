import { InjectRepository } from '@nestjs/typeorm'
import { IUserRepository } from '@src/user/domain/repositories/user.repository'
import { UserEntity } from '../database/orm/user.entity'
import { Repository } from 'typeorm'
import { IResult } from '@shared/core/result.core'

export class UserRepository<I>
  implements IUserRepository<I, IResult | UserEntity>
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly schema: Repository<UserEntity>
  ) {}

  findAll(dto: I, limit: any): Promise<UserEntity[] | IResult> {
    throw new Error('Method not implemented.')
  }

  async create(dto: I): Promise<IResult> {
    await this.schema.save(dto)

    return {
      message: 'User succefully registered',
      statusCode: 201
    }
  }
  find(dto: I): Promise<UserEntity> {
    return this.schema.findOne({ where: dto })
  }
  update(dto: I): Promise<IResult> {
    throw new Error('Method not implemented.')
  }
  delete(dto: I): Promise<IResult> {
    throw new Error('Method not implemented.')
  }
}
