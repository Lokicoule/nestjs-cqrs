import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../domain/interfaces/product.repository';
import { Product } from '../../domain/models';
import { CreateProductCommand } from '../commands';
import { BadRequestException } from '@nestjs/common';
import { ProductValidatorBuilder } from '../../domain/interfaces';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productValidatorBuilder: ProductValidatorBuilder,
  ) {}

  async execute(command: CreateProductCommand) {
    this.validateProduct(command);

    const { code, label, userId } = command;

    if (!code) {
      // todo: use command bus to dispatch a command to generate a new code
      //throw new BadRequestException('Product code is required');
    }

    if (await this.productRepository.exists(userId, code)) {
      throw new BadRequestException(
        'Product code already exists in database for this user',
      );
    }

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

  private validateProduct(command: CreateProductCommand) {
    const validation = this.productValidatorBuilder
      .buildCreateProductValidator(command)
      .validate();

    if (validation) {
      throw new BadRequestException(validation);
    }
  }
}
