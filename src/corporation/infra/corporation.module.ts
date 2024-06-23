import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CorporationEntity } from './entities/corporation.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CorporationEntity])]
})
export class CorporationModule {}
