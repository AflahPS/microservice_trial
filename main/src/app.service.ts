import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('QUOTE_SERVICE') private readonly quoteClient: ClientProxy,
    @Inject('THOUGHTS_SERVICE') private readonly thoughtClient: ClientProxy,
    @Inject('ADMIN_SERVICE') private readonly adminClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createQuote(body: any) {
    try {
      return firstValueFrom(
        this.adminClient.send('create_quote', JSON.stringify(body)),
      );
    } catch (err) {
      console.log(err);
      return { status: 'error', message: err.message };
    }
  }

  async getAllQuotes() {
    try {
      const quotes = await firstValueFrom(
        this.quoteClient.send('get_all_quotes', {}),
      );
      if (!quotes)
        return { status: 'failed', message: 'Internal server error' };
      return { status: 'success', total: quotes.length, quotes };
    } catch (err) {
      console.log(err);
      return { status: 'error', message: err.message };
    }
  }

  async editQuote(id: string, body: any) {
    try {
      const payload = JSON.stringify({ id, body });
      return firstValueFrom(this.adminClient.send('edit_quote', payload));
    } catch (err) {
      console.log(err);
      return { status: 'error', message: err.message };
    }
  }

  async deleteQuote(id: string) {
    try {
      return firstValueFrom(
        this.adminClient.send('delete_quote', JSON.stringify({ id })),
      );
    } catch (err) {
      console.log(err);
      return { status: 'error', message: err.message };
    }
  }

  async getAllThoughts() {
    try {
      const thoughts = await firstValueFrom(
        this.thoughtClient.send('get_all_thoughts', {}),
      );
      if (!thoughts)
        return { status: 'failed', message: 'Internal server error' };
      return { status: 'success', total: thoughts.length, thoughts };
    } catch (err) {
      console.log(err);
      return { status: 'error', message: err.message };
    }
  }
}
