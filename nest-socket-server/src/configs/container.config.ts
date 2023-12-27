export class ContainerConfig {
  private config = {};
  constructor() {
    this.config = {
      NODE_ENV: process.env.NODE_ENV || 'development',
      hostName: process.env.HOSTNAME || 'socket-server',
      port: parseInt(process.env.PORT || '80', 10),
    };
  }

  get(key: string): any {
    return this.config[key];
  }
}
