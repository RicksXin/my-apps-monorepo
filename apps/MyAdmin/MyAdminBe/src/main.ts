import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './filter/custom-filter/custom-filter.filter';
import { UnloginFilter } from './filter/unlogin/unlogin.filter';
import { FormatResInterceptor } from './interceptor/format-res/format-res.interceptor';
import { InvokeRecordInterceptor } from './interceptor/invoke-record/invoke-record.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FormatResInterceptor());
  app.useGlobalInterceptors(new InvokeRecordInterceptor());
  app.useGlobalFilters(new UnloginFilter());
  app.useGlobalFilters(new CustomExceptionFilter());
  const configService = app.get(ConfigService);

  await app.listen(configService.get('nest_server_port'));
}
bootstrap();
