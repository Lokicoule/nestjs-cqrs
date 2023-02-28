import { Injectable } from '@nestjs/common';
import {
  CreateSettingCommand,
  UpdateSettingCommand,
} from '~/features/setting/domain/interfaces/commands';
import {
  SettingValidator,
  SettingValidatorBuilder,
} from '~/features/setting/domain/interfaces/validators';
import {
  CreateSettingValidator,
  UpdateSettingValidator,
} from '~/features/setting/domain/validators';

@Injectable()
export class SettingValidatorBuilderImpl extends SettingValidatorBuilder {
  buildCreateSettingValidator(command: CreateSettingCommand): SettingValidator {
    return new CreateSettingValidator(command);
  }

  buildUpdateSettingValidator(command: UpdateSettingCommand): SettingValidator {
    return new UpdateSettingValidator(command);
  }
}
