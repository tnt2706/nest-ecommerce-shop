import * as path from 'path';

const protosDir = path.join(__dirname, '../../src/protos');

export default () => ({
  grpc: {
    server: {
      package: 'authService',
      protoPath: path.join(protosDir, 'auth_cache_server.proto'),
      url: process.env.AUTH_SERVER_SERVICE || '0.0.0.0:6900',
      keepalive: {
        keepaliveTimeMs: 10000,
        keepaliveTimeoutMs: 5000,
        keepalivePermitWithoutCalls: 1,
        http2MaxPingsWithoutData: 0,
        http2MinTimeBetweenPingsMs: 10000,
        http2MinPingIntervalWithoutDataMs: 5000,
      },
      loader: {
        keepCase: false,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
    },
  },
});
