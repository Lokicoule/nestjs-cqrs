import { ValidationError } from 'class-validator';

export interface ProductValidator {
  validate(): ValidationError[] | null;
}
