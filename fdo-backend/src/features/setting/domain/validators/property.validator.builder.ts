import { PropertyKeyEnum } from '../enums';
import { PropertyValidator } from './property.validator';

export class PropertyValidatorBuilder {
  private key: PropertyKeyEnum;
  private value: string | number;

  public withKey(key: PropertyKeyEnum): PropertyValidatorBuilder {
    this.key = key;
    return this;
  }

  public withValue(value: string | number): PropertyValidatorBuilder {
    this.value = value;
    return this;
  }

  public build(): PropertyValidator {
    return new PropertyValidator(this.key, this.value);
  }
}
