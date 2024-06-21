import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsString,
  ValidationError,
  validateSync
} from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    example: 'John Doe'
  })
  name!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    example: 'john.doe@example.com'
  })
  email!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    required: true,
    example: 'password123'
  })
  password!: string

  @ApiProperty({ readOnly: true })
  validate?(): ValidationError[] {
    return validateSync(this)
  }
}
