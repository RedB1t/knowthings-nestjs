import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {GraphQLModule} from '@nestjs/graphql';
import {MongooseModule} from "@nestjs/mongoose";
import {join} from 'path';

import databaseConfig from "./config/database.config";
import {validationSchema} from "./config/schema.config";
import appConfig from "@core/config/app.config";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig],
      validationSchema
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dbName: configService.get<string>('database.name'),
        uri: configService.get<string>('database.uri'),
        auth: {
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
        }
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        playground: configService.get<boolean>('graphql.playground'),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        formatError: (error) => {
          const originalError = error.extensions?.originalError as Error;

          if (!originalError) {
            return {
              message: error.message,
              code: error.extensions?.code,
            };
          }
          return {
            message: originalError.message,
            code: error.extensions?.code,
          };
        },
      }),
      inject: [ConfigService],
    }),
  ]
})
export class CoreModule {
}
