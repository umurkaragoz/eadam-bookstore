export const configuration = () => {
  const entities = 'dist/**/entities/*.js';

  return {
    DATABASE: {
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [entities],
      synchronize: true,
      logging: process.env.TYPEORM_LOGGING === 'true',
    },
    JWT_SECRET_KEY: process.env.JWT_SECRET,
  };
};
