import { NestFactory } from '@nestjs/core';
import {ConfigService} from "@nestjs/config";
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    credentials: true,
  })

  await app.listen(configService.get<number>('app.port'), '0.0.0.0', async () => console.log(`Application listening at: ${await app.getUrl()}`));
}
void bootstrap();
