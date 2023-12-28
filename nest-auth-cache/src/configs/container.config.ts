export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  hostName: process.env.HOSTNAME || 'auth-cache',
  port: parseInt(process.env.PORT || '3003', 10),
});
