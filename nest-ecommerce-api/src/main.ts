import helmet from 'helmet';
// import * as csurf from 'csurf';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(helmet());
  app.use(compression());
  // app.use(csurf());
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = app.get(ConfigService).get('port');

  await app.listen(port);
}

bootstrap();
