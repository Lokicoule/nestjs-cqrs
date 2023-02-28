import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '~/common/database';
import {
  SettingFactory,
  SettingValidatorFactory,
} from '~/features/setting/domain/factories';
import { SettingRepository } from '~/features/setting/domain/interfaces/repositories';
import {} from '../domain/validators';
import { SettingEntity, SettingSchema } from './entities';
import { SettingRepositoryImpl } from './repositories';

@Module({
  imports: [
    CqrsModule,
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
    SettingFactory,
    SettingValidatorFactory,
  ],
  exports: [SettingRepository, SettingFactory, SettingValidatorFactory],
})
export class SettingInfrastructureModule {}
