import { IsNotEmpty, IsString } from 'class-validator';
import {
  ISettingValidator,
  SettingValidator,
  SettingValidatorProps,
} from './setting.validator';

export type SettingWithIdValidatorProps = SettingValidatorProps & {
  id: string;
};

export class SettingWithIdValidator
  extends SettingValidator
  implements ISettingValidator
{
  @IsString()
  @IsNotEmpty()
  public readonly id: string;

  constructor(settingProperties: SettingWithIdValidatorProps) {
    super(settingProperties);
    Object.assign(this, settingProperties);
  }
}
