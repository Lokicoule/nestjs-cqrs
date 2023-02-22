import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './models/setting.model';
import { SettingRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Setting.name, schema: SettingSchema }]),
  ],
  //providers: [SettingRepository],
  exports: [SettingRepository],
})
export class SettingModule {}
