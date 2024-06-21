import { IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDTO {
  @IsNotEmpty()
  @IsString()
  access_code!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}
