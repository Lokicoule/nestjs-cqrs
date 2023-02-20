import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  userId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
