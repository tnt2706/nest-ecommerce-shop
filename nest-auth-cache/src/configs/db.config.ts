const mongoDbs = {
  mongo: {
    database: process.env.DB_CONNECT_STRING || 'mongodb://localhost/shopDev2',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  },
};

const redisDbs = {
  authDb: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    user: process.env.REDIS_USERNAME || undefined,
    password: process.env.REDIS_AUTH || undefined,
    database: parseInt(process.env.AUTHENTICATION_STORE, 10),
  },
};

export function getMongoConfig(key) {
  return mongoDbs[key];
}

export function getRedisConfig(key?: string) {
  return key ? redisDbs[key] : redisDbs.authDb;
}
