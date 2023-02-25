import {
  IsEnum,
  IsNotEmpty,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { PropertyKeyEnum, SettingKeyEnum } from '../enums';
import { PropertyValidator } from './property.validator';

export class SettingValidator {
  @IsString()
  @IsNotEmpty()
  public readonly userId: string;

  @IsNotEmpty()
  @IsEnum(SettingKeyEnum)
  public readonly settingKey: SettingKeyEnum;

  @IsNotEmpty()
  // This doesn't work because the Map is not compatible with the @ValidateNested decorator:
  /* @ValidateNested({ each: true })
  @Type(() => PropertyValidator) */
  public readonly properties: Map<PropertyKeyEnum, PropertyValidator>;

  constructor(
    userId: string,
    settingKey: SettingKeyEnum,
    properties: Map<PropertyKeyEnum, PropertyValidator>,
  ) {
    Object.assign(this, { userId, settingKey, properties });
  }

  public validate(): ValidationError | null {
    const settingErrors = validateSync(this);
    const propertyErrors =
      [...this.properties.entries()].map(([key, property]) =>
        property.validate(),
      ) ?? [];

    const errors = settingErrors
      .concat(propertyErrors)
      .filter((error) => error !== null);

    if (errors.length > 0) {
      const errorMessages = errors.map((error) => error?.toString());
      const error = new ValidationError();
      error.constraints = { validationError: errorMessages.join(', ') };
      return error;
    }

    return null;
  }
}
