import { Transport } from '@nestjs/microservices';

export default () => ({
  subscriberService: {
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env.SUBSCRIBER_SERVICE_PORT || '4000', 10),
      host: process.env.SUBSCRIBER_SERVICE_HOST || '0.0.0.0',
    },
  },
});
