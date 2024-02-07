import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './httpExceptionFilter';
import { CustomLoggerService } from './custom-logger/custom-logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const logger = app.get<CustomLoggerService>(CustomLoggerService);
  //app.useLogger(logger);
  //app.useGlobalFilters(new HttpExceptionFilter(logger));

  const config = new DocumentBuilder()
    .setTitle('Nombre App Pendiente')
    .setDescription('Herramienta basada en contenedores con el fin de emular ambientes de trabajo reales destinados a la enseñanza universitaria')
    .setVersion('1.0')
    //.addTag('App')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
