import * as path from 'path';

export class GrpcConfig {
  private readonly url: string;
  private readonly protoFile: string;
  private readonly package: string;
  private readonly protosDir = path.join(__dirname, '../../src/protos');

  constructor({ packageName, protoFile }) {
    this.package = packageName;
    this.protoFile = protoFile;
    this.url = process.env.SOCKET_IO_SERVER_SERVICE || '0.0.0.0:6700';
  }

  get(): any {
    return {
      url: this.url,
      package: this.package,
      protoPath: path.join(this.protosDir, this.protoFile),
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
    };
  }
}
