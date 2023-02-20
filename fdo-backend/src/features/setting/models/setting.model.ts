import { AggregateRoot } from '@nestjs/cqrs';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SettingKeyEnum, PropertyKeyEnum } from '../enums';

@Schema()
export class Setting extends AggregateRoot {
  @Prop({
    required: true,
    enum: Object.values(SettingKeyEnum),
  })
  key: SettingKeyEnum;

  @Prop({
    type: Map,
    of: String,
    validate: {
      validator: function (value) {
        return Object.keys(value).every((key) =>
          Object.values(PropertyKeyEnum).includes(key as PropertyKeyEnum),
        );
      },
      message: 'Invalid property key',
    },
  })
  properties: Map<PropertyKeyEnum, any>;

  @Prop({ type: String, required: true })
  public userId: string;
}

export type SettingDocument = Setting & Document;

export const SettingSchema = SchemaFactory.createForClass(Setting);
