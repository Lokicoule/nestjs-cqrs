import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<any> {
    if (ttl) {
      return await this.cacheManager.set(key, value, ttl);
    }

    return await this.cacheManager.set(key, value);
  }

  async del(key: string): Promise<any> {
    return await this.cacheManager.del(key);
  }
}
