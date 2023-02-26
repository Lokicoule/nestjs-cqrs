import { Injectable } from '@nestjs/common';
import {
  CreateSettingCommand,
  UpdateSettingCommand,
} from '../../domain/commands';
import {
  SettingValidator,
  SettingValidatorBuilder,
} from '../../domain/interfaces';
import {
  CreateSettingValidator,
  UpdateSettingValidator,
} from '../../domain/validators';

@Injectable()
export class SettingValidatorBuilderImpl extends SettingValidatorBuilder {
  buildCreateSettingValidator(command: CreateSettingCommand): SettingValidator {
    return new CreateSettingValidator(command);
  }

  buildUpdateSettingValidator(command: UpdateSettingCommand): SettingValidator {
    return new UpdateSettingValidator(command);
  }
}
