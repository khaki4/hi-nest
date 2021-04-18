import { ValidationPipe } from '@nestjs/common';

export const pipeConfig = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});
