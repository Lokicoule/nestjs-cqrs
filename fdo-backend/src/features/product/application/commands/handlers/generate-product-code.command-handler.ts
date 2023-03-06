import { BadRequestException, ConflictException, Logger } from '@nestjs/common';
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

const DEFAULT_PATTERN = '{prefix}{counter}{suffix}';
const DEFAULT_PREFIX = '';
const DEFAULT_SUFFIX = 'P';
const DEFAULT_COUNTER = 0;
const DEFAULT_COUNTER_PADDING = 3;
const DEFAULT_MAX_ATTEMPTS = 20;

@CommandHandler(GenerateProductCodeCommand)
export class GenerateProductCodeCommandHandler
  implements ICommandHandler<GenerateProductCodeCommand>
{
  private readonly logger = new Logger(GenerateProductCodeCommandHandler.name);
  private readonly validator: ProductValidatorBuilder =
    new ProductValidatorBuilder();

  constructor(
    private readonly productRepository: ProductRepository,
    private readonly settingRepository: ProductSettingRepository,
    private readonly productCodeGenerator: ProductCodeGenerator,
    private readonly settingFactory: ProductSettingFactory,
  ) {}

  async execute(command: GenerateProductCodeCommand): Promise<string> {
    const { userId, code } = command;

    try {
      this.validateCommand(command);
      if (code) {
        return code;
      }
      const setting = await this.findOrCreateCodeGenerationSetting(userId);
      return await this.generateUniqueProductCode(setting);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private async findOrCreateCodeGenerationSetting(
    userId: string,
  ): Promise<ProductSetting> {
    const key = ProductSettingKey.CODE_GENERATION;
    const properties = new Map<ProductSettingPropertyKey, string | number>([
      [ProductSettingPropertyKey.CODE_GENERATION_COUNTER, DEFAULT_COUNTER],
      [
        ProductSettingPropertyKey.CODE_GENERATION_COUNTER_PADDING,
        DEFAULT_COUNTER_PADDING,
      ],
      [
        ProductSettingPropertyKey.CODE_GENERATION_MAX_ATTEMPTS,
        DEFAULT_MAX_ATTEMPTS,
      ],
      [ProductSettingPropertyKey.CODE_GENERATION_PREFIX, DEFAULT_PREFIX],
      [ProductSettingPropertyKey.CODE_GENERATION_SUFFIX, DEFAULT_SUFFIX],
      [ProductSettingPropertyKey.CODE_GENERATION_PATTERN, DEFAULT_PATTERN],
    ]);

    const productSetting = this.settingFactory.create({
      id: this.settingRepository.generateId(userId),
      userId,
      key,
      properties,
    });

    return await this.settingRepository.findOneOrCreate(
      { userId, key },
      productSetting,
    );
  }

  private async generateUniqueProductCode(
    setting: ProductSetting,
  ): Promise<string> {
    const maxAttempts = setting.properties.get(
      ProductSettingPropertyKey.CODE_GENERATION_MAX_ATTEMPTS,
    ) as number;

    for (let nbAttempts = 1; nbAttempts <= maxAttempts; nbAttempts++) {
      const code = this.productCodeGenerator.generate(setting, nbAttempts);
      if (!(await this.productRepository.exists(setting.userId, code))) {
        setting.counterUpdated(nbAttempts);
        await this.settingRepository.update(setting);
        return code;
      }
    }

    setting.counterUpdated(maxAttempts);
    await this.settingRepository.update(setting);

    throw new ConflictException(
      `Unable to generate a unique product code after ${maxAttempts} attempts`,
    );
  }

  private validateCommand(command: GenerateProductCodeCommand) {
    const validation = this.validator
      .withUserId(command.userId)
      .build()
      .validate();

    if (validation) {
      throw new BadRequestException(validation);
    }
  }
}
