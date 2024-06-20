import { InjectRepository } from '@nestjs/typeorm'
import { IUserRepository } from '@src/user/domain/repositories/user.repository'
import { UserEntity } from '../database/orm/user.entity'
import { Repository } from 'typeorm'

export class UserRepository<I, O> implements IUserRepository<I, O> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly schema: Repository<UserEntity>
  ) {}

  async create(dto: I): Promise<O> {
    if (this.schema.find({ where: dto })) return

    await this.schema.save(dto)
  }
  find(dto: I): Promise<O> {
    throw new Error('Method not implemented.')
  }
  update(dto: I): Promise<O> {
    throw new Error('Method not implemented.')
  }
  delete(dto: I): Promise<O> {
    throw new Error('Method not implemented.')
  }
  findAll(dto: I, limit: any): Promise<O> {
    throw new Error('Method not implemented.')
  }
}
