import {
  ProductSettingKey,
  ProductSettingPropertyKey,
} from '~/features/product/domain/enums';
import { ProductSetting } from '~/features/product/domain/interfaces/models';
import { ProductSettingImpl } from '../../models';
import { ProductCodeGenerationStrategy } from './strategies/product-code-generation.interface';
import { ProductCodeGenerator } from './product-code-generator';

class MockStrategy implements ProductCodeGenerationStrategy {
  generate(setting: ProductSetting): string {
    return 'mock-code';
  }
}

describe('ProductCodeGenerator', () => {
  let generator: ProductCodeGenerator;

  beforeEach(() => {
    generator = new ProductCodeGenerator();
  });

  describe('generate', () => {
    it('should generate code using default strategy', () => {
      const setting = new ProductSettingImpl({
        id: '1',
        userId: '1',
        key: ProductSettingKey.CODE_GENERATION,
        properties: new Map<ProductSettingPropertyKey, string | number>(),
      });

      const code = generator.generate(setting);

      expect(code).toMatch(/^\d+P$/);
    });

    it('should use custom strategy if provided', () => {
      const setting = new ProductSettingImpl({
        id: '1',
        userId: '1',
        key: ProductSettingKey.CODE_GENERATION,
        properties: new Map<ProductSettingPropertyKey, string | number>(),
      });
      const mockStrategy = new MockStrategy();
      const generatorWithMock = new ProductCodeGenerator();
      generatorWithMock.setStrategy(mockStrategy);

      const code = generatorWithMock.generate(setting);

      expect(code).toBe('mock-code');
    });
  });
});
