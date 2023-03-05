import { CreateProductWithCodeGenCommandHandler } from './create-product-with-code-gen.command-handler';
import { CreateProductCommandHandler } from './create-product.command-handler';
import { GenerateProductCodeCommandHandler } from './generate-product-code.command-handler';

export const CommandHandlers = [
  CreateProductCommandHandler,
  GenerateProductCodeCommandHandler,
  CreateProductWithCodeGenCommandHandler,
];
