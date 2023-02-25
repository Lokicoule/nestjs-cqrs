import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '~/common';
import { SettingRepository } from '../domain/interfaces';
import { SettingEntity, SettingSchema } from './entities';
import { SettingRepositoryImpl } from './repositories';

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
  ],
  exports: [SettingRepository],
})
export class SettingInfrastructureModule {}
