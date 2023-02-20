import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Config } from './config.model';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, Config],
  exports: [ConfigService, Config],
})
export class ConfigModule {}
