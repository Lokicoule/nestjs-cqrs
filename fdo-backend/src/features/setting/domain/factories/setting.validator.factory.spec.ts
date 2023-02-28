import {
  CreateSettingCommand,
  UpdateSettingCommand,
} from '~/features/setting/domain/interfaces/commands';
import { SettingKeyEnum } from '~/features/setting/domain/enums';
import {
  CreateSettingValidator,
  UpdateSettingValidator,
} from '~/features/setting/domain/validators';
import { SettingValidatorFactory } from './setting.validator.factory';

describe('SettingValidatorFactoryImpl', () => {
  let settingValidatorFactory: SettingValidatorFactory;

  beforeEach(() => {
    settingValidatorFactory = new SettingValidatorFactory();
  });

  describe('createValidatorForCreateSetting', () => {
    it('should return a CreateSettingValidator', () => {
      const command: CreateSettingCommand = {
        userId: 'user123',
        key: SettingKeyEnum.CUSTOMER_CODE_GENERATOR,
        properties: new Map(),
      };

      const validator =
        settingValidatorFactory.createValidatorForCreateSetting(command);

      expect(validator).toBeInstanceOf(CreateSettingValidator);
    });
  });

  describe('createValidatorForUpdateSetting', () => {
    it('should return an UpdateSettingValidator', () => {
      const command: UpdateSettingCommand = {
        id: 'setting123',
        userId: 'user123',
        key: SettingKeyEnum.CUSTOMER_CODE_GENERATOR,
        properties: new Map(),
      };

      const validator =
        settingValidatorFactory.createValidatorForUpdateSetting(command);

      expect(validator).toBeInstanceOf(UpdateSettingValidator);
    });
  });
});
