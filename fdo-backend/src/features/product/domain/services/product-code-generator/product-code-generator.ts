import { Injectable } from '@nestjs/common';
import { ProductSetting } from '~/features/product/domain/interfaces/models';
import {
  DefaultProductCodeGenerationStrategy,
  ProductCodeGenerationStrategy,
} from './strategies';

@Injectable()
export class ProductCodeGenerator {
  private strategy: ProductCodeGenerationStrategy =
    new DefaultProductCodeGenerationStrategy();

  setStrategy(strategy: ProductCodeGenerationStrategy) {
    this.strategy = strategy;
  }

  generate(setting: ProductSetting, nbAttempts?: number): string {
    return this.strategy.generate(setting, nbAttempts);
  }
}
