import { AggregateRoot } from '@nestjs/cqrs';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Setting } from '../../domain/models/setting.model';

@Schema({
  collection: 'settings',
  timestamps: true,
})
export class SettingEntity extends AggregateRoot {
  @Prop({
    required: true,
    enum: Object.values(Setting['key']),
  })
  key: Setting['key'];

  @Prop({
    type: Map,
    of: String,
    validate: {
      validator: function (value) {
        return Object.keys(value).every((key) =>
          Object.values(Setting['properties']).includes(key),
        );
      },
      message: 'Invalid property key',
    },
  })
  properties: Map<Setting['properties'], any>;

  @Prop({ required: true })
  userId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type SettingDocument = SettingEntity & Document;

export const SettingSchema = SchemaFactory.createForClass(SettingEntity);
