import { ProductSettingPropertyKey } from '../../../enums';
import { ProductSetting } from '../../../interfaces/models';
import { ProductCodeGenerationStrategy } from './product-code-generation.interface';

export class DefaultProductCodeGenerationStrategy
  implements ProductCodeGenerationStrategy
{
  private readonly DEFAULT_PATTERN = '{prefix}{counter}{suffix}';
  private readonly DEFAULT_PREFIX = '';
  private readonly DEFAULT_SUFFIX = 'P';
  private readonly DEFAULT_COUNTER = 0;
  private readonly DEFAULT_COUNTER_PADDING = 3;

  generate(setting: ProductSetting, nbAttempts = 1): string {
    const pattern = this.getPropertyValue<string>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_PATTERN,
      this.DEFAULT_PATTERN,
    );
    const prefix = this.getPropertyValue<string>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_PREFIX,
      this.DEFAULT_PREFIX,
    );
    const suffix = this.getPropertyValue<string>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_SUFFIX,
      this.DEFAULT_SUFFIX,
    );
    const counter = this.getPropertyValue<number>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_COUNTER,
      this.DEFAULT_COUNTER,
    );
    const counterPadding = this.getPropertyValue<number>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_COUNTER_PADDING,
      this.DEFAULT_COUNTER_PADDING,
    );

    const generatedCode = pattern
      .replace(/{prefix}/g, prefix)
      .replace(
        /{counter}/g,
        (counter + nbAttempts).toString().padStart(counterPadding, '0'),
      )
      .replace(/{suffix}/g, suffix);

    return generatedCode;
  }

  private getPropertyValue<T>(
    setting: ProductSetting,
    key: ProductSettingPropertyKey,
    defaultValue: T,
  ): T {
    const value = setting.properties.get(key) as T;
    return value !== undefined ? value : defaultValue;
  }
}
