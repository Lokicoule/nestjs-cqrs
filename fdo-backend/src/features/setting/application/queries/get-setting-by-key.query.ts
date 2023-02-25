import { IQuery } from '@nestjs/cqrs';
import { SettingKeyEnum } from '../../domain/enums';

export class GetSettingByKeyQuery implements IQuery {
  constructor(
    public readonly settingKey: SettingKeyEnum,
    public readonly userId: string,
  ) {}
}
