import {
  CreateSettingCommand,
  UpdateSettingCommand,
} from '../../domain/commands';
import { SettingKeyEnum } from '../../domain/enums';
import {
  CreateSettingValidator,
  UpdateSettingValidator,
} from '../../domain/validators';
import { SettingValidatorBuilderImpl } from './setting.validator.builder.impl';

describe('SettingValidatorBuilderImpl', () => {
  let settingValidatorBuilder: SettingValidatorBuilderImpl;

  beforeEach(() => {
    settingValidatorBuilder = new SettingValidatorBuilderImpl();
  });

  describe('buildCreateSettingValidator', () => {
    it('should return a CreateSettingValidator', () => {
      const command: CreateSettingCommand = {
        userId: 'user123',
        key: SettingKeyEnum.CUSTOMER_CODE_GENERATOR,
        properties: new Map(),
      };

      const validator =
        settingValidatorBuilder.buildCreateSettingValidator(command);

      expect(validator).toBeInstanceOf(CreateSettingValidator);
    });
  });

  describe('buildUpdateSettingValidator', () => {
    it('should return an UpdateSettingValidator', () => {
      const command: UpdateSettingCommand = {
        id: 'setting123',
        userId: 'user123',
        key: SettingKeyEnum.CUSTOMER_CODE_GENERATOR,
        properties: new Map(),
      };

      const validator =
        settingValidatorBuilder.buildUpdateSettingValidator(command);

      expect(validator).toBeInstanceOf(UpdateSettingValidator);
    });
  });
});
