import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote } from './quote.model';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel('Quote') private readonly quoteModel: Model<Quote>,
  ) {}

  async all() {
    return this.quoteModel.find();
  }

  async create(body: any) {
    try {
      return this.quoteModel.create(body);
    } catch (err) {
      console.log(err);
    }
  }

  async edit(id, body) {
    try {
      return this.quoteModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      return this.quoteModel.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
