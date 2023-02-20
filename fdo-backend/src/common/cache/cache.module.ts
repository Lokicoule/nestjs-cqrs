import { CacheModule as NestCacheModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [
    NestCacheModule.register({
      max: 100,
      ttl: 60 * 60 * 24 * 7,
      isGlobal: true,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
