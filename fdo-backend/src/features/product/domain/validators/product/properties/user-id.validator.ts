import {
  IsNotEmpty,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { Validator } from '~/common/validator';

export class UserIdValidator implements Validator {
  @IsNotEmpty()
  @IsString()
  public readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  public validate(): ValidationError[] {
    return validateSync(this);
  }
}
