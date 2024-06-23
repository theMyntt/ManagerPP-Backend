import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { UUID } from '@utils/uuid.util'
import { Observable } from 'rxjs'

@Injectable()
export class AuthMiddleware implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const auth = request.headers.authorization

    if (!auth) {
      throw new UnauthorizedException('Forbidden')
    }

    const validate = UUID.validate(auth)
    if (!validate) {
      throw new UnauthorizedException('Invalid token')
    }

    return true
  }
}
