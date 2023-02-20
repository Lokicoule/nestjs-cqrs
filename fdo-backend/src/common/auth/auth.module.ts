import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '~/common/config';

@Module({
  imports: [
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (authConfigService: ConfigService) => ({
        jwtVerifier: {
          userPoolId: authConfigService.cognito.userPoolId,
          clientId: authConfigService.cognito.clientId,
          tokenUse: authConfigService.cognito.tokenUse,
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
