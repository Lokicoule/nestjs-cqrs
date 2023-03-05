import { ICommand } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { GenerateProductCodeCommand } from './generate-product-code.command';

export class CreateProductWithAutoCodeCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly label: string,
    public readonly code?: string,
  ) {}

  createCreateProductCommand(code?: string): CreateProductCommand {
    return new CreateProductCommand(this.userId, this.label, code || this.code);
  }

  createGenerateProductCodeCommand(): GenerateProductCodeCommand {
    return new GenerateProductCodeCommand(this.userId, this.code);
  }
}
