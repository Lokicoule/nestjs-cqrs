import {
  IsNotEmpty,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { Validator } from '~/common/validator';

export class CodeValidator implements Validator {
  @IsNotEmpty()
  @IsString()
  public readonly code: string;

  constructor(code: string) {
    this.code = code;
  }

  public validate(): ValidationError[] {
    return validateSync(this);
  }
}
