import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { UUID } from '@utils/uuid.util' // Certifique-se de que este utilitário está correto e disponível
import { Observable } from 'rxjs'

@Injectable()
export class AuthMiddleware implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const authorizationHeader = request.headers.authorization
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing')
    }

    const token = authorizationHeader.replace('Bearer ', '').trim()
    if (!token) {
      throw new UnauthorizedException('Forbidden')
    }

    const isValid = UUID.validate(token)
    if (!isValid) {
      throw new UnauthorizedException('Invalid token')
    }

    return true
  }
}
