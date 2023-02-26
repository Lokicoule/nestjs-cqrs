import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { PropertyValidatorBuilder } from './property.validator.builder';
import { UpdateSettingValidator } from './update-setting.validator';

describe('SettingWithIdValidator', () => {
  it('should validate a valid setting', () => {
    const result = new UpdateSettingValidator({
      id: 'id',
      userId: 'userId',
      key: SettingKeyEnum.PRODUCT_CODE_GENERATOR,
      properties: new Map([
        [
          PropertyKeyEnum.PREFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.PREFIX)
            .withValue('prefix')
            .build(),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.SUFFIX)
            .withValue('suffix')
            .build(),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.COUNTER)
            .withValue(123)
            .build(),
        ],
      ]),
    });

    expect(result.validate()).toBeNull();
  });

  it('should return an error for a missing id', () => {
    const result = new UpdateSettingValidator({
      id: '',
      userId: 'userId',
      key: SettingKeyEnum.PRODUCT_CODE_GENERATOR,
      properties: new Map([
        [
          PropertyKeyEnum.PREFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.PREFIX)
            .withValue('prefix')
            .build(),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.SUFFIX)
            .withValue('suffix')
            .build(),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidatorBuilder()
            .withKey(PropertyKeyEnum.COUNTER)
            .withValue(123)
            .build(),
        ],
      ]),
    });

    const errors = result.validate();
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toEqual('id');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
