import { IsNotEmpty, IsString } from 'class-validator';
import { SettingValidator } from '../interfaces/validators';
import {
  CreateSettingValidator,
  CreateSettingValidatorProps,
} from './create-setting.validator';

export type UpdateSettingValidatorProps = CreateSettingValidatorProps & {
  id: string;
};

export class UpdateSettingValidator
  extends CreateSettingValidator
  implements SettingValidator
{
  @IsNotEmpty()
  @IsString()
  public readonly id: string;

  constructor(settingProperties: UpdateSettingValidatorProps) {
    super(settingProperties);
    Object.assign(this, settingProperties);
  }
}
