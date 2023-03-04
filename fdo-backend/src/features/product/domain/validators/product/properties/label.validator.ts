import {
  IsNotEmpty,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { Validator } from '~/common/validator';

export class LabelValidator implements Validator {
  @IsNotEmpty()
  @IsString()
  public readonly label: string;

  constructor(label: string) {
    this.label = label;
  }

  public validate(): ValidationError[] {
    return validateSync(this);
  }
}
