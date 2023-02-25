import { ValidationError } from 'class-validator';
import { PropertyKeyEnum } from '../enums';
import { PropertyValidator } from './property.validator';

describe('PropertyValidator', () => {
  describe('validate', () => {
    it('should not throw an error for a valid string property', () => {
      const validator = new PropertyValidator(
        PropertyKeyEnum.PREFIX,
        'valid property value',
      );
      expect(validator.validate()).toBeNull();
    });

    it('should not throw an error for a valid number property', () => {
      const validator = new PropertyValidator(PropertyKeyEnum.COUNTER, 123);
      expect(validator.validate()).toBeNull();
    });

    it('should throw an error for a missing property value', () => {
      const validator = new PropertyValidator(PropertyKeyEnum.PREFIX, '');
      expect(validator.validate()).toBeInstanceOf(ValidationError);
    });

    it('should throw an error for an invalid property key', () => {
      const validator = new PropertyValidator(
        PropertyKeyEnum.COUNTER,
        'valid value',
      );
      expect(validator.validate()).toBeInstanceOf(ValidationError);
    });

    it('should throw an error for a non-string property value', () => {
      const validator = new PropertyValidator(PropertyKeyEnum.PREFIX, 123);
      expect(validator.validate()).toBeInstanceOf(ValidationError);
    });

    it('should throw an error for a non-number property value for counter key', () => {
      const validator = new PropertyValidator(
        PropertyKeyEnum.COUNTER,
        'invalid value',
      );
      expect(validator.validate()).toBeInstanceOf(ValidationError);
    });
  });
});
