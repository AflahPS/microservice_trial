import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/quote')
  createQuote(@Body() body: any) {
    return this.appService.createQuote(body);
  }

  @Get('/quote')
  getAllQuote() {
    return this.appService.getAllQuotes();
  }

  @Patch('/quote/:id')
  editQuote(@Param('id') id, @Body() body) {
    return this.appService.editQuote(id, body);
  }

  @Delete('/quote/:id')
  deleteQuote(@Param('id') id) {
    return this.appService.deleteQuote(id);
  }

  @Get('/thought')
  getAllThought() {
    return this.appService.getAllThoughts();
  }
}
