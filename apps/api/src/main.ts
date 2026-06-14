import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { writeFileSync } from 'node:fs';
import type { Request, Response } from 'express';

type ExpressHandler = (request: Request, response: Response) => void;

function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/+$/, '');
}

function getAllowedOrigins(): Set<string> {
  const configuredOrigins = (process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);

  return new Set([
    'http://localhost:2000',
    'http://127.0.0.1:2000',
    'https://pieselak.vercel.app',
    ...configuredOrigins,
  ]);
}

async function createApplication(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const allowedOrigins = getAllowedOrigins();

  app.useBodyParser('json', { limit: '2mb' });

  app.enableCors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
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

  return app;
}

async function bootstrap() {
  const logger = new Logger('AppModule');
  const app = await createApplication();
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server started on port ${process.env.PORT}`);
}

let serverPromise: Promise<ExpressHandler> | undefined;

async function getServer(): Promise<ExpressHandler> {
  serverPromise ??= createApplication().then(async (app) => {
    await app.init();
    return app.getHttpAdapter().getInstance() as ExpressHandler;
  });

  return serverPromise;
}

export default async function handler(
  request: Request,
  response: Response,
): Promise<void> {
  const server = await getServer();

  await new Promise<void>((resolve, reject) => {
    response.once('finish', resolve);
    response.once('close', resolve);
    response.once('error', reject);

    try {
      server(request, response);
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}

if (!process.env.VERCEL) {
  void bootstrap();
}
