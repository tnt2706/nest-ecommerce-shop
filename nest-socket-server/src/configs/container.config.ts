export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  hostName: process.env.HOSTNAME || 'socket-server',
  port: parseInt(process.env.PORT || '3002', 10),
  wsPort: parseInt(process.env.WS_PORT || '80', 10),
});
