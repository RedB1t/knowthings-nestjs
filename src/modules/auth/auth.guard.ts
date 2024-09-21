import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {Reflector} from "@nestjs/core";
import { GqlExecutionContext } from '@nestjs/graphql';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';

import {IS_PUBLIC_KEY} from "@shared/decorators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('app.secret')
        }
      );
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const [type, token] = request.cookies.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}