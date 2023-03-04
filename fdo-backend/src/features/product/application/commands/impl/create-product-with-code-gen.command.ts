import { ICommand } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { GenerateProductCodeCommand } from './generate-product-code.command';

export class CreateProductWithCodeGenCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly label: string,
    public readonly code?: string,
  ) {}

  readonly createProductCommand = new CreateProductCommand(
    this.userId,
    this.label,
    this.code,
  );

  readonly generateProductCodeCommand = new GenerateProductCodeCommand(
    this.userId,
    this.code,
  );
}
