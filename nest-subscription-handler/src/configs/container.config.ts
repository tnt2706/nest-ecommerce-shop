export class ContainerConfig {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: parseInt(process.env.SUBSCRIBER_SERVICE_PORT || '4000', 10),
      host: process.env.SUBSCRIBER_SERVICE_HOST || 'localhost',
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
