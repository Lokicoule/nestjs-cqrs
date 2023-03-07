import { Module } from '@nestjs/common';
import { CacheModule } from '~/common/cache';
import { ConfigModule } from '~/common/config';
import { FeaturesModule } from './features';

@Module({
  imports: [CacheModule, ConfigModule, FeaturesModule],
})
export class AppModule {}
