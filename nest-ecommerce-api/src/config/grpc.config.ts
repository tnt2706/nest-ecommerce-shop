import * as path from 'path';

const protosDir = path.join(__dirname, '../../src/protos');

export default () => ({
  socketServer: {
    url: process.env.GRPC_SOCKET_IO_SERVER_URL || '0.0.0.0:6700',
    package: 'socketio',
    protoPath: path.join(protosDir, 'socketio_server.proto'),
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
});
