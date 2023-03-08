import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThoughtDocument = Document<Thought>;

@Schema({ timestamps: true })
export class Thought {
  @Prop()
  content: string;

  @Prop()
  author: string;
}

export const ThoughtSchema = SchemaFactory.createForClass(Thought);
