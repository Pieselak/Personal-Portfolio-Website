import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import express from 'express';
import serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';

const isDev = process.env.NODE_ENV === 'development';

const expressApp = express();
let cachedHandler: any;

async function createNestApp() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:2000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useStaticAssets('public', {
    prefix: '/assets/',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const documentConfig = new DocumentBuilder()
    .setTitle('Portfolio website API')
    .setDescription('API documentation for the portfolio website')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: '/docs-json',
    yamlDocumentUrl: '/docs-yaml',
  });

  await app.init();

  return app;
}

/**
 * 🔥 DEV MODE (lokalnie)
 * klasyczny serwer NestJS
 */
async function bootstrapDev() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:2000',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Portfolio website API')
    .setDescription('API documentation for the portfolio website')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: '/docs-json',
    yamlDocumentUrl: '/docs-yaml',
  });

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `🚀 Server running on http://localhost:${process.env.PORT ?? 3000}`,
  );
}

/**
 * ☁️ PRODUCTION (Vercel serverless)
 */
async function bootstrapServerless() {
  if (!cachedHandler) {
    await createNestApp();
    cachedHandler = serverless(expressApp);
  }

  return cachedHandler;
}

/**
 * 🔥 ENTRYPOINT
 */
if (isDev) {
  bootstrapDev();
}

// Vercel zawsze wymaga exportu
export default async function handler(req: any, res: any) {
  const serverlessHandler = await bootstrapServerless();
  return serverlessHandler(req, res);
}
