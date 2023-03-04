import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {
  ProductSettingKey,
  ProductSettingPropertyKey,
} from '../../domain/enums';

export type ProductSettingDocument = ProductSettingEntity & Document;

@Schema({
  collection: 'product_settings',
  timestamps: true,
})
export class ProductSettingEntity {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  key: ProductSettingKey;

  @Prop({ required: true, type: Map, of: MongooseSchema.Types.Mixed })
  properties: Map<ProductSettingPropertyKey, string | number>;

  @Prop({ required: true })
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSettingSchema =
  SchemaFactory.createForClass(ProductSettingEntity);
