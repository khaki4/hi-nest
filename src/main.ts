import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { pipeConfig } from './pipeConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(pipeConfig);
  await app.listen(3000);
}
bootstrap();
