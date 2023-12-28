export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  hostName: process.env.HOSTNAME || 'socket-server',
  port: parseInt(process.env.PORT || '80', 10),
});
