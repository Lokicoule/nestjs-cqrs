import { Injectable } from '@nestjs/common';
import {
  CreateSettingCommand,
  UpdateSettingCommand,
} from '~/features/setting/domain/interfaces/commands';
import { SettingValidator } from '~/features/setting/domain/interfaces/validators';
import {
  CreateSettingValidator,
  UpdateSettingValidator,
} from '~/features/setting/domain/validators';

@Injectable()
export class SettingValidatorFactory {
  createValidatorForCreateSetting(
    command: CreateSettingCommand,
  ): SettingValidator {
    return new CreateSettingValidator(command);
  }

  createValidatorForUpdateSetting(
    command: UpdateSettingCommand,
  ): SettingValidator {
    return new UpdateSettingValidator(command);
  }
}
