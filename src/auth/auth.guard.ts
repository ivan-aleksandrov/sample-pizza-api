import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { IS_CUSTOMER_KEY } from './decorators/customer.decorator';
import { IS_ADMIN_KEY } from './decorators/admin.decorator';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // allow if endpoint has public decorator
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // check if user is still active and add user role from the db
      const user = await this.usersService.findOne(payload.username);
      if (!user || !user.active) {
        throw new UnauthorizedException();
      }
      // add user payload to the request so it can be used for identification
      request['user'] = { ...payload, role: user.role };
    } catch {
      throw new UnauthorizedException();
    }

    // check if customer or admin role is granted for Customer decorator
    const isCustomer = this.reflector.getAllAndOverride<boolean>(IS_CUSTOMER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isCustomer && !['admin', 'customer'].includes(request.user?.role)) {
      throw new UnauthorizedException();
    }

    // check if admin role is granted for Admin decorator
    const isAdmin = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_KEY, [context.getHandler(), context.getClass()]);
    if (isAdmin && !['admin'].includes(request.user?.role)) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
