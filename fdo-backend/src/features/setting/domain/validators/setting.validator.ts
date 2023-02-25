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

  public validate(): ValidationError[] | null {
    const validationErrors: ValidationError[] = [];
    const settingErrors = validateSync(this);
    validationErrors.push(...settingErrors);

    for (const [key, property] of this.properties.entries()) {
      const errors = property.validate() ?? [];
      validationErrors.push(
        ...errors.map((error) => this.prependPropertyKeyToErrorKey(key, error)),
      );
    }

    if (validationErrors.length > 0) {
      return validationErrors;
    }

    return null;
  }

  private prependPropertyKeyToErrorKey(
    key: string,
    error: ValidationError,
  ): ValidationError {
    const newError = new ValidationError();
    newError.property = `${key}.${error.property}`;
    newError.constraints = error.constraints;
    newError.children = error.children?.map((childError) =>
      this.prependPropertyKeyToErrorKey(key, childError),
    );
    return newError;
  }
}
