import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('QUOTE_SERVICE') private readonly quoteClient: ClientProxy,
    @Inject('THOUGHTS_SERVICE') private readonly thoughtClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createQuote(body) {
    try {
      const payload = JSON.parse(body);
      const newQuote = await firstValueFrom(
        this.quoteClient.send('create_quote', JSON.stringify(payload)),
      );
      if (!newQuote)
        return { status: 'failed', message: 'Internal server error' };
      return { status: 'success', quote: newQuote };
    } catch (err) {
      console.log(err);
      return { status: 'error', message: err.message };
    }
  }

  async editQuote(body) {
    try {
      const payload = JSON.parse(body);
      const quote = await firstValueFrom(
        this.quoteClient.send('edit_quote', JSON.stringify(payload)),
      );
      if (!quote) return { status: 'failed', message: 'Internal server error' };
      return { status: 'success', quote };
    } catch (err) {
      console.log(err);
      return { status: 'error', message: err.message };
    }
  }

  async deleteQuote(body) {
    try {
      const payload = JSON.parse(body);
      const isDeleted = await firstValueFrom(
        this.quoteClient.send('delete_quote', JSON.stringify(payload)),
      );
      if (!isDeleted)
        return { status: 'failed', message: 'Internal server error' };
      return { status: 'success' };
    } catch (err) {
      console.log(err);
      return { status: 'error', message: err.message };
    }
  }
}
