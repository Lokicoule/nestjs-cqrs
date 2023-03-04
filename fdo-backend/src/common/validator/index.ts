import { ValidationError } from 'class-validator';

export interface Validator {
  validate: () => ValidationError[];
}

export abstract class ValidatorBuilder {
  public abstract build(): Validator;
}
