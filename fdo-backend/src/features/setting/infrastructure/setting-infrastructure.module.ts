import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '~/common/database';
import { SettingFactory } from '~/features/setting/domain/interfaces/factories';
import { SettingRepository } from '~/features/setting/domain/interfaces/repositories';
import { SettingValidatorBuilder } from '~/features/setting/domain/interfaces/validators';
import { SettingEntity, SettingSchema } from './entities';
import { SettingFactoryImpl } from './factories';
import { SettingRepositoryImpl } from './repositories';
import { SettingValidatorBuilderImpl } from './validators';

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
    {
      provide: SettingFactory,
      useClass: SettingFactoryImpl,
    },
  ],
  exports: [SettingRepository, SettingValidatorBuilder, SettingFactory],
})
export class SettingInfrastructureModule {}
