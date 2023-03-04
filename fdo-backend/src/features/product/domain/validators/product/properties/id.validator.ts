import {
  IsNotEmpty,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { Validator } from '~/common/validator';

export class IdValidator implements Validator {
  @IsNotEmpty()
  @IsString()
  public readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  public validate(): ValidationError[] {
    return validateSync(this);
  }
}
