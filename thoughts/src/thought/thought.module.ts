import { Module } from '@nestjs/common';
import { ThoughtController } from './thought.controller';
import { ThoughtService } from './thought.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ThoughtSchema } from './thought.model';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Thought', schema: ThoughtSchema }]),
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
  controllers: [ThoughtController],
  providers: [ThoughtService],
})
export class ThoughtModule {}
