import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { writeFileSync } from 'node:fs';

async function bootstrap() {
  const logger = new Logger('AppModule');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useBodyParser('json', { limit: '2mb' });

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/assets/',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const documentConfig = new DocumentBuilder()
    .setTitle('Portfolio website API')
    .setDescription('API documentation for the portfolio website')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('docs', app, documentFactory(), {
    jsonDocumentUrl: '/docs-json',
    yamlDocumentUrl: '/docs-yaml',
  });

  if (process.env.NODE_ENV === 'localdevelopment') {
    writeFileSync(
      'src/swagger/api-schema.json',
      JSON.stringify(documentFactory(), null, 2),
    );
  }

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server started on port ${process.env.PORT}`);
}
void bootstrap();
