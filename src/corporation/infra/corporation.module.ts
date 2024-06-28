import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CorporationEntity } from './entities/corporation.entity'
import { CorporationRepository } from './repositories/corporation.repository'
import { CorporationService } from '../domain/services/corporation.service'
import { CreateCorporationUseCase } from '../app/usecases/create.usecase'
import { CreateCorporationController } from './controllers/create.controller'
import { DeleteCorporationUseCase } from '../app/usecases/delete.usecase'
import { DeleteCorporationController } from './controllers/delete.controller'

@Module({
  imports: [TypeOrmModule.forFeature([CorporationEntity])],
  controllers: [CreateCorporationController, DeleteCorporationController],
  providers: [
    { provide: 'I_CORPORATION_REPOSITORY', useClass: CorporationRepository },
    { provide: 'I_CORPORATION_ENTITY', useClass: CorporationEntity },
    { provide: 'I_CREATE_USECASE', useClass: CreateCorporationUseCase },
    { provide: 'I_DELETE_USECASE', useClass: DeleteCorporationUseCase },
    CorporationService
  ]
})
export class CorporationModule {}
