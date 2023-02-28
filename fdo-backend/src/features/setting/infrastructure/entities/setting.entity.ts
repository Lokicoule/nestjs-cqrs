import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  PropertyKeyEnum,
  SettingKeyEnum,
} from '~/features/setting/domain/enums';

@Schema({ collection: 'settings', timestamps: true })
export class SettingEntity {
  @Prop({ required: true })
  key: SettingKeyEnum;

  @Prop({
    type: Map,
    of: String || Number,
    validate: {
      validator: function (value: Map<PropertyKeyEnum, string | number>) {
        return Object.keys(value).every((key) =>
          Object.values(PropertyKeyEnum).includes(key as PropertyKeyEnum),
        );
      },
      message: 'Invalid property key',
    },
  })
  properties: Map<PropertyKeyEnum, string | number>;

  @Prop({ required: true })
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type SettingDocument = SettingEntity & Document;

export const SettingSchema = SchemaFactory.createForClass(SettingEntity);
