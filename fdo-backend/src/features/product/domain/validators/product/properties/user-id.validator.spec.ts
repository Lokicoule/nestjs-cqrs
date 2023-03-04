import { UserIdValidator } from './user-id.validator';

describe('UserIdValidator', () => {
  it('should validate userId', () => {
    const userIdValidator = new UserIdValidator('userId');
    const errors = userIdValidator.validate();
    expect(errors.length).toBe(0);
  });

  it('should not validate empty userId', () => {
    const userIdValidator = new UserIdValidator('');
    const errors = userIdValidator.validate();
    expect(errors.length).toBe(1);
  });

  it('should not validate undefined userId', () => {
    const userIdValidator = new UserIdValidator(undefined);
    const errors = userIdValidator.validate();
    expect(errors.length).toBe(1);
  });
});
