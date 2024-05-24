import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  app.setGlobalPrefix("api")

  const config = new DocumentBuilder()
    .setTitle('My API documentation')
    .setDescription('Shopping cart study test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('web/api', app, document);

  await app.listen(3000);
}
bootstrap();
