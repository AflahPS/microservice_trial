import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: '*',
  // });
  // await app.listen(7001);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://localhost:5672`],
        queue: `THOUGHTS_QUEUE`,
        queueOptions: { durable: false },
      },
    },
  );
  await app.listen();
}
bootstrap();
