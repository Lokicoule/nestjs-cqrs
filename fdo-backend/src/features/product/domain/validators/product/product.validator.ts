import { ValidationError } from 'class-validator';
import { ValidatorBuilder } from '~/common/validator';
import { CodeValidator } from './properties/code.validator';
import { IdValidator } from './properties/id.validator';
import { LabelValidator } from './properties/label.validator';
import { UserIdValidator } from './properties/user-id.validator';

class ProductValidator {
  private idValidator?: IdValidator;
  private userIdValidator?: UserIdValidator;
  private codeValidator?: CodeValidator;
  private labelValidator?: LabelValidator;

  constructor(
    idValidator?: IdValidator,
    userIdValidator?: UserIdValidator,
    codeValidator?: CodeValidator,
    labelValidator?: LabelValidator,
  ) {
    this.idValidator = idValidator;
    this.userIdValidator = userIdValidator;
    this.codeValidator = codeValidator;
    this.labelValidator = labelValidator;
  }

  public validate(): ValidationError[] | null {
    const errors = [
      this.idValidator?.validate(),
      this.userIdValidator?.validate(),
      this.codeValidator?.validate(),
      this.labelValidator?.validate(),
    ]
      .filter((error) => Boolean(error))
      .flatMap((error) => error);
    return errors.length > 0 ? errors : null;
  }
}

export class ProductValidatorBuilder extends ValidatorBuilder {
  private idValidator?: IdValidator;
  private userIdValidator?: UserIdValidator;
  private codeValidator?: CodeValidator;
  private labelValidator?: LabelValidator;

  public withId(id: string): ProductValidatorBuilder {
    this.idValidator = new IdValidator(id);
    return this;
  }

  public withUserId(userId: string): ProductValidatorBuilder {
    this.userIdValidator = new UserIdValidator(userId);
    return this;
  }

  public withCode(code: string): ProductValidatorBuilder {
    this.codeValidator = new CodeValidator(code);
    return this;
  }

  public withLabel(label: string): ProductValidatorBuilder {
    this.labelValidator = new LabelValidator(label);
    return this;
  }

  public build(): ProductValidator {
    return new ProductValidator(
      this.idValidator,
      this.userIdValidator,
      this.codeValidator,
      this.labelValidator,
    );
  }
}
