export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  hostName: process.env.HOSTNAME || 'nest-tutorial',
  port: parseInt(process.env.PORT || '3000', 10),
  NAMESPACE: process.env.NAMESPACE || 'dev',
});
