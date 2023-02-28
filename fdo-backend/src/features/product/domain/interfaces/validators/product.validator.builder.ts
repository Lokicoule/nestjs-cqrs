import { CreateProductCommand, UpdateProductCommand } from '../commands';
import { ProductValidator } from './product.validator';

export abstract class ProductValidatorBuilder {
  abstract buildCreateProductValidator(
    command: CreateProductCommand,
  ): ProductValidator;
  abstract buildUpdateProductValidator(
    command: UpdateProductCommand,
  ): ProductValidator;
}
