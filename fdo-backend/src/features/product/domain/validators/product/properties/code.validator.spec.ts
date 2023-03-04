import { CodeValidator } from './code.validator';

describe('CodeValidator', () => {
  it('should validate code', () => {
    const codeValidator = new CodeValidator('code');
    const errors = codeValidator.validate();
    expect(errors.length).toBe(0);
  });

  it('should not validate empty code', () => {
    const codeValidator = new CodeValidator('');
    const errors = codeValidator.validate();
    expect(errors.length).toBe(1);
  });

  it('should not validate undefined code', () => {
    const codeValidator = new CodeValidator(undefined);
    const errors = codeValidator.validate();
    expect(errors.length).toBe(1);
  });
});
