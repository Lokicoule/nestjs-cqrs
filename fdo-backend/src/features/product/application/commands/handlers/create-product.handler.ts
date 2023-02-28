import { BadRequestException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from '~/features/product/domain/interfaces/repositories';
import { ProductValidatorBuilder } from '~/features/product/domain/interfaces/validators';
import { Product } from '~/features/product/domain/models';
import { SettingKeyEnum } from '~/features/setting/domain/enums';
import { SettingRepository } from '~/features/setting/domain/interfaces/repositories';
import { CreateProductCommand } from '../impl';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productValidatorBuilder: ProductValidatorBuilder,
    private readonly settingRepository: SettingRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateProductCommand) {
    this.validateProduct(command);

    const { code, label, userId } = command;
    const id = this.productRepository.generateId(userId);

    const product = this.publisher.mergeObjectContext(
      new Product({
        id,
        code,
        label,
        userId,
      }),
    );

    if (!code) {
      const setting = await this.settingRepository.findByKey(
        userId,
        SettingKeyEnum.PRODUCT_CODE_GENERATOR,
      );

      let nbAttempts = 0;
      for (nbAttempts; nbAttempts < 10; nbAttempts++) {
        product.generateCode(setting);
        product.updateSettingCounter(setting);
        if (!(await this.productRepository.exists(userId, product.getCode()))) {
          break;
        }
      }
      if (nbAttempts === 10) {
        throw new BadRequestException(
          'Unable to generate a unique product code after 10 attempts',
        );
      }
    } else if (await this.productRepository.exists(userId, code)) {
      throw new BadRequestException(
        'Product code already exists in database for this user',
      );
    }

    await this.productRepository.create(product);

    product.commit();

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
