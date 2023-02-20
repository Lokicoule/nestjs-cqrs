import { IQuery } from '@nestjs/cqrs';
import { SettingKeyEnum } from '../../enums';

export class GetSettingQuery implements IQuery {
  constructor(
    public readonly key: SettingKeyEnum,
    public readonly userId: string,
  ) {}
}
