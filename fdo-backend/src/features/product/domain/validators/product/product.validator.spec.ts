import { ProductValidatorBuilder } from './product.validator';

describe('ProductValidatorBuilder', () => {
  it('should validate product', () => {
    const productValidator = new ProductValidatorBuilder()
      .withId('id')
      .withCode('code')
      .withLabel('label')
      .withUserId('userId')
      .build();
    const errors = productValidator.validate();
    expect(errors).toBeNull();
  });

  it('should not validate undefined product', () => {
    const productValidator = new ProductValidatorBuilder()
      .withId(undefined)
      .withCode(undefined)
      .withLabel(undefined)
      .withUserId(undefined)
      .build();
    const errors = productValidator.validate();
    expect(errors.length).toBe(4);
  });
});
