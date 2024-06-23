import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateCorporationDTO {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  email: string

  @IsOptional()
  phone: string
}
