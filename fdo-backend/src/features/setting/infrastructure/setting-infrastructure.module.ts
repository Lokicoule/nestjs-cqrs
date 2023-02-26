import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '~/common/database';
import {
  SettingRepository,
  SettingValidatorBuilder,
} from '../domain/interfaces';
import { SettingEntity, SettingSchema } from './entities';
import { SettingRepositoryImpl } from './repositories';
import { SettingValidatorBuilderImpl } from './validators/setting.validator.builder.impl';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: SettingEntity.name, schema: SettingSchema },
    ]),
  ],
  providers: [
    {
      provide: SettingRepository,
      useClass: SettingRepositoryImpl,
    },
    {
      provide: SettingValidatorBuilder,
      useClass: SettingValidatorBuilderImpl,
    },
  ],
  exports: [SettingRepository, SettingValidatorBuilder],
})
export class SettingInfrastructureModule {}
