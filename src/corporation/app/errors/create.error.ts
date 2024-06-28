import { HttpException } from '@nestjs/common'

export class CantCreate extends HttpException {
  constructor() {
    super(
      {
        message: 'We cant create this corporation',
        statusCode: 409
      },
      409
    )
  }
}
