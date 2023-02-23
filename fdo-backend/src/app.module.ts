import { Module } from '@nestjs/common';
import { CacheModule, ConfigModule } from '~/common';
import { FeaturesModule } from './features';

@Module({
  imports: [CacheModule, ConfigModule, FeaturesModule],
})
export class AppModule {}
