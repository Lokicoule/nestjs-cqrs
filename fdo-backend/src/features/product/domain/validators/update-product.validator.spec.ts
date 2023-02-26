import { ValidationError } from 'class-validator';
import { UpdateProductValidator } from './update-product.validator';

describe('UpdateProductValidator', () => {
  describe('validate', () => {
    it('should not return an error for a valid product', () => {
      const validator = new UpdateProductValidator({
        id: 'valid product id',
        label: 'valid product label',
        userId: 'valid user id',
        code: 'valid product code',
      });

      expect(validator.validate()).toBeNull();
    });

    it('should return an error for a missing product code', () => {
      const validator = new UpdateProductValidator({
        id: 'valid product id',
        code: '',
        label: 'valid product label',
        userId: 'valid user id',
      });
      expect(validator.validate()).toBeInstanceOf(Array<ValidationError>);
    });

    it('should return an error for a missing product label', () => {
      const validator = new UpdateProductValidator({
        id: 'valid product id',
        code: 'valid product code',
        label: '',
        userId: 'valid user id',
      });
      expect(validator.validate()).toBeInstanceOf(Array<ValidationError>);
    });

    it('should return an error for a missing product user id', () => {
      const validator = new UpdateProductValidator({
        id: 'valid product id',
        code: 'valid product code',
        label: 'valid product label',
        userId: '',
      });
      expect(validator.validate()).toBeInstanceOf(Array<ValidationError>);
    });
  });
});
