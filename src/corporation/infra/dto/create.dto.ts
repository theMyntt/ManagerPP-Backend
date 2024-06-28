import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateCorporationDTO {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'John Doe Corporation'
  })
  name: string

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    example: 'johndoe@joecorp.com'
  })
  email: string

  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
    example: '+55 (11) 99000-0000'
  })
  phone: string
}
