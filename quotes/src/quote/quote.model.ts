import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuoteDocument = Document<Quote>;

@Schema({ timestamps: true })
export class Quote {
  @Prop()
  content: string;

  @Prop()
  author: string;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
