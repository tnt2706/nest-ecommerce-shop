export default () => ({
  mongo: {
    database: process.env.DB_CONNECT_STRING || 'mongodb://localhost/shopDev2',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    redisDbs: {
      authDb: {
        url: process.env.REDIS_CONNECTION_STRING || 'redis://localhost:6379',
        user: process.env.REDIS_USERNAME || undefined,
        password: process.env.REDIS_AUTH || undefined,
        database: parseInt(process.env.AUTHENTICATION_STORE, 10) || 0,
      },
    },
  },
});
