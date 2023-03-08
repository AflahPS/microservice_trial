import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('create_quote')
  createQuote(@Payload() body) {
    return this.appService.createQuote(body);
  }

  @MessagePattern('edit_quote')
  editQuote(@Payload() payload) {
    return this.appService.editQuote(payload);
  }

  @MessagePattern('delete_quote')
  deleteQuote(@Payload() payload) {
    return this.appService.deleteQuote(payload);
  }
}
