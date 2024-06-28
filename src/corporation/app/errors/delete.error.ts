import { HttpException } from '@nestjs/common'

export class CannotFind extends HttpException {
  constructor() {
    super(
      {
        message: 'We cant find this corporation',
        statusCode: 404
      },
      404
    )
  }
}
