import { Injectable } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { validate } from 'class-validator';
import { Config } from './config.model';

@Injectable()
export class ConfigService {
  constructor(private readonly config: Config) {
    this.validate();
  }

  async validate() {
    return await validate(this.config);
  }

  public get http() {
    return this.config.http;
  }

  public get cognito() {
    return this.config.cognito;
  }

  public get database() {
    return this.config.database;
  }
}

registerAs('app', () => new ConfigService(new Config()));
