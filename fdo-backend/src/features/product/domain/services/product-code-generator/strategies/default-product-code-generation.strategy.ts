import { ProductSettingPropertyKey } from '../../../enums';
import { ProductSetting } from '../../../interfaces/models';
import { ProductCodeGenerationStrategy } from './product-code-generation.interface';

const DEFAULT_PATTERN = '{prefix}{counter}{suffix}';
const DEFAULT_PREFIX = '';
const DEFAULT_SUFFIX = 'P';
const DEFAULT_COUNTER = 0;
const DEFAULT_COUNTER_PADDING = 3;

export class DefaultProductCodeGenerationStrategy
  implements ProductCodeGenerationStrategy
{
  generate(setting: ProductSetting, nbAttempts = 1): string {
    const pattern = this.getPropertyValue<string>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_PATTERN,
      DEFAULT_PATTERN,
    );
    const prefix = this.getPropertyValue<string>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_PREFIX,
      DEFAULT_PREFIX,
    );
    const suffix = this.getPropertyValue<string>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_SUFFIX,
      DEFAULT_SUFFIX,
    );
    const counter = this.getPropertyValue<number>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_COUNTER,
      DEFAULT_COUNTER,
    );
    const counterPadding = this.getPropertyValue<number>(
      setting,
      ProductSettingPropertyKey.CODE_GENERATION_COUNTER_PADDING,
      DEFAULT_COUNTER_PADDING,
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
