import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateIf,
  validateSync,
  ValidationError,
} from 'class-validator';
import { PropertyKeyEnum } from '../enums';

export class PropertyValidator {
  @IsNotEmpty()
  @IsEnum(PropertyKeyEnum, { message: 'Property key is invalid' })
  public readonly key: PropertyKeyEnum;

  @IsNotEmpty()
  @ValidateIf((obj, value) => obj.key === PropertyKeyEnum.COUNTER, {
    groups: [PropertyKeyEnum.COUNTER],
  })
  @ValidateIf((obj, value) => obj.key !== PropertyKeyEnum.COUNTER, {
    groups: [PropertyKeyEnum.PREFIX, PropertyKeyEnum.SUFFIX],
  })
  @IsNumber(
    {},
    {
      message: 'Counter must be a number',
      groups: [PropertyKeyEnum.COUNTER],
    },
  )
  @IsString({
    message: 'Prefix and suffix must be a string',
    groups: [PropertyKeyEnum.PREFIX, PropertyKeyEnum.SUFFIX],
  })
  @MinLength(1, {
    message: 'Prefix and suffix must be at least 1 character',
    groups: [PropertyKeyEnum.PREFIX, PropertyKeyEnum.SUFFIX],
  })
  public readonly value: string | number;

  constructor(key: PropertyKeyEnum, value: string | number) {
    Object.assign(this, { key, value });
  }

  public validate(): ValidationError[] | null {
    const errors = validateSync(this, { groups: [this.key] });

    if (errors.length > 0) {
      return errors;
    }

    return null;
  }
}
