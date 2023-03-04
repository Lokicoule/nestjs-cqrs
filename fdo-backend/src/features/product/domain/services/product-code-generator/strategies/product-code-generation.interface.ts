import { ProductSetting } from '../../../interfaces/models';

export interface ProductCodeGenerationStrategy {
  generate(setting: ProductSetting, nbAttempts?: number): string;
}
