import {Module} from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";

import {UsersModule} from "@modules/users/users.module";
import {AuthService} from './auth.service';
import {AuthResolver} from './auth.resolver';
import {AuthGuard} from "./auth.guard";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('app.secret'),
        signOptions: {expiresIn: '60s'},
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {
}
