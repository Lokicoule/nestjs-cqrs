import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../commands';
import { Product } from '../../domain/models';
import { ProductRepository } from '../../domain/interfaces/product.repository';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(command: CreateProductCommand) {
    const { code, label, userId } = command;
    const product = this.publisher.mergeObjectContext(
      new Product(label, userId, code, this.productRepository.generateId()),
    );
    await this.productRepository.create(product);
    product.commit();
    return product;
  }
}
