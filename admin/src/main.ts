import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: '*',
  // });
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [`amqp://localhost:5672`],
  //     queue: `QUOTES_QUEUE`,
  //     queueOptions: { durable: false },
  //     prefetchCount: 1,
  //   },
  // });
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [`amqp://localhost:5672`],
  //     queue: `THOUGHTS_QUEUE`,
  //     queueOptions: { durable: false },
  //     prefetchCount: 1,
  //   },
  // });
  // await app.listen(7000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://localhost:5672`],
        queue: `ADMIN_QUEUE`,
        queueOptions: { durable: false },
      },
    },
  );
  await app.listen();
}
bootstrap();
