import { CreateProductWithAutoCodeCommandHandler } from './create-product-with-auto-code.command-handler';
import { CreateProductCommandHandler } from './create-product.command-handler';
import { GenerateProductCodeCommandHandler } from './generate-product-code.command-handler';

export const CommandHandlers = [
  CreateProductCommandHandler,
  GenerateProductCodeCommandHandler,
  CreateProductWithAutoCodeCommandHandler,
];
