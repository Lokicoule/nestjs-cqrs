import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
  id: false,
})
export class Product {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
