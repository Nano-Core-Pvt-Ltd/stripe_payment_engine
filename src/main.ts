import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 50,
      message: 'Too many requests, please try again later.',
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
