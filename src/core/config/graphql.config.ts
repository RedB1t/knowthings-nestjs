import { registerAs } from '@nestjs/config';

export default registerAs('graphql', () => ({
  playground: process.env.GRAPHQL_PLAYGROUND ? {
    settings: {
      'request.credentials': 'include', // Otherwise cookies won't be sent
    },
  } : false,
}));