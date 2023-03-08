import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ThoughtModule } from './thought/thought.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ms_thoughts', {
      autoCreate: true,
    }),
    ThoughtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
