import { Injectable } from '@nestjs/common';
import {
  CreateProductCommand,
  UpdateProductCommand,
} from '../../domain/commands';
import {
  ProductValidator,
  ProductValidatorBuilder,
} from '../../domain/interfaces';
import {
  CreateProductValidator,
  UpdateProductValidator,
} from '../../domain/validators';

@Injectable()
export class ProductValidatorBuilderImpl extends ProductValidatorBuilder {
  buildCreateProductValidator(command: CreateProductCommand): ProductValidator {
    return new CreateProductValidator(command);
  }

  buildUpdateProductValidator(command: UpdateProductCommand): ProductValidator {
    return new UpdateProductValidator(command);
  }
}
