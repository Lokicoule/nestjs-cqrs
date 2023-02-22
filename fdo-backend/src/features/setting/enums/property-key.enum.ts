import { registerEnumType } from '@nestjs/graphql';

export enum PropertyKeyEnum {
  COUNTER = 'COUNTER',
  PREFIX = 'PREFIX',
  SUFFIX = 'SUFFIX',
}

registerEnumType(PropertyKeyEnum, {
  name: 'PropertyKeyEnum',
});
