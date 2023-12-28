import * as path from 'path';

const protosDir = path.join(__dirname, '../../src/protos');

const keepalive = {
  keepaliveTimeMs: 10000,
  keepaliveTimeoutMs: 5000,
  keepalivePermitWithoutCalls: 1,
  http2MaxPingsWithoutData: 0,
  http2MinTimeBetweenPingsMs: 10000,
  http2MinPingIntervalWithoutDataMs: 5000,
};

const loader = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

export default () => ({
  grpc: {
    server: {
      package: 'socketio',
      protoPath: path.join(protosDir, 'socketio_server.proto'),
      url: process.env.GRPC_SOCKET_IO_SERVER_URL || '0.0.0.0:6700',
      keepalive,
      loader,
    },
    clients: {
      authService: {
        package: 'auth',
        protoPath: path.join(protosDir, 'auth_cache_server.proto'),
        url: process.env.GRPC_AUTH_SERVER_URL || '0.0.0.0:6900',
        keepalive,
        loader,
      },
    },
  },
});
