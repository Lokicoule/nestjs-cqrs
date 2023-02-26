import { ValidationError } from 'class-validator';
import { CreateProductValidator } from './create-product.validator';

describe('CreateProductValidator', () => {
  describe('validate', () => {
    it('should not return an error for a valid product', () => {
      const validator = new CreateProductValidator({
        label: 'valid product label',
        userId: 'valid user id',
        code: 'valid product code',
      });

      expect(validator.validate()).toBeNull();
    });

    it('should not return an error for a missing product code', () => {
      const validator = new CreateProductValidator({
        label: 'valid product label',
        userId: 'valid user id',
      });
      expect(validator.validate()).toBeNull();
    });

    it('should return an error for a missing product label', () => {
      const validator = new CreateProductValidator({
        code: 'valid product code',
        label: '',
        userId: 'valid user id',
      });
      expect(validator.validate()).toBeInstanceOf(Array<ValidationError>);
    });

    it('should return an error for a missing product user id', () => {
      const validator = new CreateProductValidator({
        code: 'valid product code',
        label: 'valid product label',
        userId: '',
      });
      expect(validator.validate()).toBeInstanceOf(Array<ValidationError>);
    });
  });
});
