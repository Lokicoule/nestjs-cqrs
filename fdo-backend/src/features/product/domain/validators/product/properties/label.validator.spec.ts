import { LabelValidator } from './label.validator';

describe('LabelValidator', () => {
  it('should validate label', () => {
    const labelValidator = new LabelValidator('label');
    const errors = labelValidator.validate();
    expect(errors.length).toBe(0);
  });

  it('should not validate empty label', () => {
    const labelValidator = new LabelValidator('');
    const errors = labelValidator.validate();
    expect(errors.length).toBe(1);
  });

  it('should not validate undefined label', () => {
    const labelValidator = new LabelValidator(undefined);
    const errors = labelValidator.validate();
    expect(errors.length).toBe(1);
  });
});
