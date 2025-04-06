import path from 'path';

export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL') ? {
        rejectUnauthorized: false
      } : false,
      pool: {
        min: env.int('DATABASE_POOL_MIN', 0),
        max: env.int('DATABASE_POOL_MAX', 10),
        idleTimeoutMillis: env.int('DATABASE_POOL_IDLE_TIMEOUT', 30000)
      }
    },
    options: {
      useNullAsDefault: true,
      pool: {
        min: env.int('DATABASE_POOL_MIN', 0),
        max: env.int('DATABASE_POOL_MAX', 10),
        idleTimeoutMillis: env.int('DATABASE_POOL_IDLE_TIMEOUT', 30000)
      }
    },
    debug: env.bool('DATABASE_DEBUG', false),
  },
});
