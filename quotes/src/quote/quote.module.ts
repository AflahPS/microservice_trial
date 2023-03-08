import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteSchema } from './quote.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quote', schema: QuoteSchema }]),
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
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
