import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = ProductEntity & Document;

@Schema({
  collection: 'products',
  timestamps: true,
})
export class ProductEntity {
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

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
