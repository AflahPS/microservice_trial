import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @MessagePattern('create_quote')
  public async createQuote(@Payload() data: any) {
    try {
      const payload = JSON.parse(data);
      console.log({ payload });

      return this.quoteService.create(payload);
    } catch (err) {
      console.log(err);
    }
  }

  @MessagePattern('get_all_quotes')
  public async getAll() {
    try {
      return this.quoteService.all();
    } catch (err) {
      console.log(err);
    }
  }

  @MessagePattern('edit_quote')
  public async edit(@Payload() data) {
    try {
      const { id, body } = JSON.parse(data);
      return this.quoteService.edit(id, body);
    } catch (err) {
      console.log(err);
    }
  }

  @MessagePattern('delete_quote')
  public async delete(@Payload() data) {
    try {
      const { id } = JSON.parse(data);
      return this.quoteService.delete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
