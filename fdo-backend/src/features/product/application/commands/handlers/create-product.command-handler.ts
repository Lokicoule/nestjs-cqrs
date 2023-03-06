import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductFactory } from '~/features/product/domain/factories';
import { ProductRepository } from '~/features/product/domain/interfaces/repositories';
import { ProductValidatorBuilder } from '~/features/product/domain/validators/product';
import { CreateProductCommand } from '../impl/create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  private readonly logger = new Logger(CreateProductCommandHandler.name);
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productFactory: ProductFactory,
  ) {}

  async execute(command: CreateProductCommand) {
    try {
      this.validateCommand(command);

      const { label, userId, code } = command;

      if (await this.productRepository.exists(userId, code)) {
        throw new BadRequestException(
          'Product code already exists in database for this user',
        );
      }

      const id = this.productRepository.generateId(userId);

      const product = this.productFactory.create({
        id,
        code,
        label,
        userId,
      });

      await this.productRepository.create(product);

      product.addProduct();
      product.commit();
      return product;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private validateCommand(command: CreateProductCommand) {
    const validation = new ProductValidatorBuilder()
      .withCode(command.code)
      .withLabel(command.label)
      .withUserId(command.userId)
      .build()
      .validate();

    if (validation) {
      throw new BadRequestException(validation);
    }
  }
}
