import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { PropertyValidator } from './property.validator';
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
          new PropertyValidator(PropertyKeyEnum.PREFIX, 'prefix'),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidator(PropertyKeyEnum.SUFFIX, 'suffix'),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidator(PropertyKeyEnum.COUNTER, 123),
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
          new PropertyValidator(PropertyKeyEnum.PREFIX, 'prefix'),
        ],
        [
          PropertyKeyEnum.SUFFIX,
          new PropertyValidator(PropertyKeyEnum.SUFFIX, 'suffix'),
        ],
        [
          PropertyKeyEnum.COUNTER,
          new PropertyValidator(PropertyKeyEnum.COUNTER, 123),
        ],
      ]),
    });

    const errors = result.validate();
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toEqual('id');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
});
