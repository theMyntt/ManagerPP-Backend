import { IsNotEmpty } from 'class-validator'

export class DeleteCorporationDTO {
  @IsNotEmpty()
  email: string
}
