import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  validateSync,
  ValidationError,
} from 'class-validator';
import { ProductValidator } from '../interfaces';

export type CreateProductValidatorProps = {
  code?: string;
  label: string;
  userId: string;
};

export class CreateProductValidator implements ProductValidator {
  @ValidateIf((object, value) => !Boolean(value))
  @IsString()
  @IsOptional()
  public readonly code: string;

  @IsNotEmpty()
  @IsString()
  public readonly label: string;

  @IsNotEmpty()
  @IsString()
  public readonly userId: string;

  constructor(productProperties: CreateProductValidatorProps) {
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
