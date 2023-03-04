import { IdValidator } from './id.validator';

describe('IdValidator', () => {
  it('should validate id', () => {
    const idValidator = new IdValidator('id');
    const errors = idValidator.validate();
    expect(errors.length).toBe(0);
  });

  it('should not validate empty id', () => {
    const idValidator = new IdValidator('');
    const errors = idValidator.validate();
    expect(errors.length).toBe(1);
  });

  it('should not validate undefined id', () => {
    const idValidator = new IdValidator(undefined);
    const errors = idValidator.validate();
    expect(errors.length).toBe(1);
  });
});
