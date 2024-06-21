import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    maxLength: 7,
    required: true,
    example: '1234567'
  })
  access_code!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    example: 'password123'
  })
  password!: string
}
