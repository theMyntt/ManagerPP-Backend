import {
  IsNotEmpty,
  IsString,
  ValidationError,
  validateSync
} from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string

  validate?(): ValidationError[] {
    return validateSync(this)
  }
}
