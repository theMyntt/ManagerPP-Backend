import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CorporationEntity } from './entities/corporation.entity'
import { CorporationRepository } from './repositories/corporation.repository'

@Module({
  imports: [TypeOrmModule.forFeature([CorporationEntity])],
  providers: [
    { provide: 'I_CORPORATION_REPOSITORY', useClass: CorporationRepository },
    { provide: 'I_CORPORATION_ENTITY', useClass: CorporationEntity }
  ]
})
export class CorporationModule {}
