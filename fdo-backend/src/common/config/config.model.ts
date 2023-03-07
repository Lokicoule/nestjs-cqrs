import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class Config {
  @IsNotEmpty()
  public readonly http: {
    port: number;
  };

  @IsNotEmpty()
  public readonly cognito: {
    region: string;
    userPoolId: string;
    clientId: string;
    accessKeyId: string;
    secretAccessKey: string;
    tokenUse: 'id' | 'access';
  };

  @IsNotEmpty()
  public readonly database: {
    uri: string;
  };

  @IsNotEmpty()
  public readonly redis: {
    host: string;
    port: number;
    password: string;
  };

  constructor() {
    this.http = {
      port: Number(process.env.HTTP_PORT),
    };
    this.cognito = {
      clientId: process.env.COGNITO_CLIENT_ID,
      region: process.env.COGNITO_REGION,
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      accessKeyId: process.env.COGNITO_ACCESS_KEY_ID,
      secretAccessKey: process.env.COGNITO_SECRET_ACCESS_KEY,
      tokenUse: (process.env.COGNITO_TOKEN_USE as 'id' | 'access') || 'id',
    };
    this.database = {
      uri: process.env.DATABASE_URI,
    };
    this.redis = {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    };
  }
}
