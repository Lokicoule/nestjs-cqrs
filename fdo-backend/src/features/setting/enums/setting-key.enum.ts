import { registerEnumType } from '@nestjs/graphql';

export enum SettingKeyEnum {
  CUSTOMER_CODE_GENERATOR = 'CUSTOMER_CODE_GENERATOR',
  PRODUCT_CODE_GENERATOR = 'PRODUCT_CODE_GENERATOR',
}

registerEnumType(SettingKeyEnum, {
  name: 'SettingKeyEnum',
});
