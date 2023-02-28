import { ValidationError } from 'class-validator';

export interface SettingValidator {
  validate(): ValidationError[] | null;
}
