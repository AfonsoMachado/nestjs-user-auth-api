import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/errors/global-exception.filter';

function swaggerConfig(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS CRUD API with Authtentication')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());
  swaggerConfig(app);
  await app.listen(3000);
}
bootstrap();
