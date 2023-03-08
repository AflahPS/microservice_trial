import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ThoughtDocument } from './thought.model';

@Injectable()
export class ThoughtService {
  constructor(
    @InjectModel('Thought')
    private readonly thougtModel: Model<ThoughtDocument>,
  ) {}

  async all() {
    return this.thougtModel.find();
  }
}
