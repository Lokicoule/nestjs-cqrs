import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../domain/interfaces/product.repository';
import { Product } from '../../domain/models';
import { CreateProductCommand } from '../commands';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(command: CreateProductCommand) {
    const { code, label, userId } = command;
    const id = this.productRepository.generateId(userId);

    const product = await this.productRepository.create(
      new Product({
        id,
        code,
        label,
        userId,
      }),
    );

    return product;
  }
}
