import {registerAs} from "@nestjs/config";

export default registerAs('database', () => ({
  uri: `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
}));