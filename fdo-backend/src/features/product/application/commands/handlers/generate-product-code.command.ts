import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ProductSettingKey,
  ProductSettingPropertyKey,
} from '~/features/product/domain/enums';
import { ProductSettingFactory } from '~/features/product/domain/factories';
import { ProductSetting } from '~/features/product/domain/interfaces/models';
import {
  ProductRepository,
  ProductSettingRepository,
} from '~/features/product/domain/interfaces/repositories';
import { ProductCodeGenerator } from '~/features/product/domain/services/product-code-generator';
import { ProductValidatorBuilder } from '~/features/product/domain/validators/product';
import { GenerateProductCodeCommand } from '../impl';

@CommandHandler(GenerateProductCodeCommand)
export class GenerateProductCodeCommandHandler
  implements ICommandHandler<GenerateProductCodeCommand>
{
  private readonly logger = new Logger(GenerateProductCodeCommandHandler.name);

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly settingRepository: ProductSettingRepository,
    private readonly productCodeGenerator: ProductCodeGenerator,
    private readonly settingFactory: ProductSettingFactory,
  ) {}

  async execute(command: GenerateProductCodeCommand): Promise<string> {
    this.validateCommand(command);

    if (command.code) {
      return command.code;
    }

    const { userId } = command;
    const setting = await this.findOrCreateCodeGenerationSetting(userId);
    const code = await this.generateUniqueProductCode(setting);
    return code;
  }

  private async findOrCreateCodeGenerationSetting(userId: string) {
    const key = ProductSettingKey.CODE_GENERATION;
    const setting = await this.settingRepository.findOne({ userId, key });
    return setting ?? this.createCodeGenerationSetting(userId, key);
  }

  private createCodeGenerationSetting(userId: string, key: ProductSettingKey) {
    const setting = this.settingFactory.create({
      id: this.settingRepository.generateId(userId),
      userId,
      key,
      properties: new Map<ProductSettingPropertyKey, string | number>([
        [ProductSettingPropertyKey.CODE_GENERATION_COUNTER, 0],
        [ProductSettingPropertyKey.CODE_GENERATION_COUNTER_PADDING, 3],
        [ProductSettingPropertyKey.CODE_GENERATION_MAX_ATTEMPTS, 10],
        [ProductSettingPropertyKey.CODE_GENERATION_PREFIX, ''],
        [ProductSettingPropertyKey.CODE_GENERATION_SUFFIX, 'P'],
        [
          ProductSettingPropertyKey.CODE_GENERATION_PATTERN,
          '{prefix}{counter}{suffix}',
        ],
      ]),
    });
    return this.settingRepository.create(setting);
  }

  private async generateUniqueProductCode(setting: ProductSetting) {
    let nbAttempts = 1;
    const maxAttempts = setting.properties.get(
      ProductSettingPropertyKey.CODE_GENERATION_MAX_ATTEMPTS,
    ) as number;
    let code: string;

    for (; nbAttempts <= maxAttempts; nbAttempts++) {
      code = this.productCodeGenerator.generate(setting, nbAttempts);
      if (!(await this.productRepository.exists(setting.userId, code))) {
        break;
      }
    }

    setting.counterUpdated(nbAttempts);
    await this.settingRepository.update(setting);

    if (nbAttempts === maxAttempts) {
      throw new BadRequestException(
        'Unable to generate a unique product code after 10 attempts',
      );
    }

    return code;
  }

  private validateCommand(command: GenerateProductCodeCommand) {
    const validation = new ProductValidatorBuilder()
      .withUserId(command.userId)
      .build()
      .validate();

    if (validation) {
      this.logger.error(validation);
      throw new BadRequestException(validation);
    }
  }
}
