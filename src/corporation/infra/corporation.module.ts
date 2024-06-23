import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CorporationEntity } from './entities/corporation.entity'
import { CorporationRepository } from './repositories/corporation.repository'
import { CorporationService } from '../domain/services/corporation.service'
import { CreateCorporationUseCase } from '../app/usecases/create.usecase'
import { CreateCorporationController } from './controllers/create.controller'

@Module({
  imports: [TypeOrmModule.forFeature([CorporationEntity])],
  controllers: [CreateCorporationController],
  providers: [
    { provide: 'I_CORPORATION_REPOSITORY', useClass: CorporationRepository },
    { provide: 'I_CORPORATION_ENTITY', useClass: CorporationEntity },
    { provide: 'I_CREATE_USECASE', useClass: CreateCorporationUseCase },
    CorporationService
  ]
})
export class CorporationModule {}
