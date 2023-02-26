import {
  IsNotEmpty,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { ProductValidator } from '../interfaces';

export type UpdateProductValidatorProps = {
  id: string;
  code: string;
  label: string;
  userId: string;
};

export class UpdateProductValidator implements ProductValidator {
  @IsNotEmpty()
  @IsString()
  public readonly id: string;

  @IsNotEmpty()
  @IsString()
  public readonly code: string;

  @IsNotEmpty()
  @IsString()
  public readonly label: string;

  @IsNotEmpty()
  @IsString()
  public readonly userId: string;

  constructor(productProperties: UpdateProductValidatorProps) {
    Object.assign(this, productProperties);
  }

  public validate(): ValidationError[] | null {
    const errors = validateSync(this);

    if (errors.length > 0) {
      return errors;
    }

    return null;
  }
}
