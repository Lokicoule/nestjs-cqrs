import { CreateSettingCommand } from '../commands/create-setting.command';
import { UpdateSettingCommand } from '../commands/update-setting.command';
import { SettingValidator } from './setting.validator';

export abstract class SettingValidatorBuilder {
  abstract buildCreateSettingValidator(
    command: CreateSettingCommand,
  ): SettingValidator;
  abstract buildUpdateSettingValidator(
    command: UpdateSettingCommand,
  ): SettingValidator;
}
