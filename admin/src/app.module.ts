import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'ADMIN_SERVICE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://localhost:5672`],
            queue: `ADMIN_QUEUE`,
            queueOptions: { durable: false },
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'QUOTE_SERVICE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://localhost:5672`],
            queue: `QUOTES_QUEUE`,
            queueOptions: { durable: false },
          },
        }),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'THOUGHTS_SERVICE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://localhost:5672`],
            queue: `THOUGHTS_QUEUE`,
            queueOptions: { durable: false },
          },
        }),
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
