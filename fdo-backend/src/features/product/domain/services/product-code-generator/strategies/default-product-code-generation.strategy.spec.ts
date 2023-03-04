import {
  ProductSettingKey,
  ProductSettingPropertyKey,
} from '~/features/product/domain/enums';
import { ProductSettingImpl } from '../../../models';
import { DefaultProductCodeGenerationStrategy } from './default-product-code-generation.strategy';

describe('DefaultProductCodeGenerationStrategy', () => {
  let productCodeGenerator: DefaultProductCodeGenerationStrategy;

  beforeEach(() => {
    productCodeGenerator = new DefaultProductCodeGenerationStrategy();
  });

  describe('generate', () => {
    it('should generate a code with default properties', () => {
      const setting = new ProductSettingImpl({
        id: '1',
        userId: '1',
        key: ProductSettingKey.CODE_GENERATION,
        properties: new Map<ProductSettingPropertyKey, string | number>(),
      });
      const generatedCode = productCodeGenerator.generate(setting);

      expect(generatedCode).toMatch(/^001P$/);
    });

    it('should generate a code with custom prefix and suffix', () => {
      const setting = new ProductSettingImpl({
        id: '1',
        userId: '1',
        key: ProductSettingKey.CODE_GENERATION,
        properties: new Map([
          [ProductSettingPropertyKey.CODE_GENERATION_PREFIX, 'ABC'],
          [ProductSettingPropertyKey.CODE_GENERATION_SUFFIX, 'XYZ'],
        ]),
      });
      const generatedCode = productCodeGenerator.generate(setting);

      expect(generatedCode).toMatch(/^ABC001XYZ$/);
    });

    it('should generate a code with custom pattern', () => {
      const setting = new ProductSettingImpl({
        id: '1',
        userId: '1',
        key: ProductSettingKey.CODE_GENERATION,
        properties: new Map([
          [
            ProductSettingPropertyKey.CODE_GENERATION_PATTERN,
            '{counter}-{prefix}-{suffix}',
          ],
          [ProductSettingPropertyKey.CODE_GENERATION_SUFFIX, 'XYZ'],
          [ProductSettingPropertyKey.CODE_GENERATION_PREFIX, ''],
        ]),
      });
      const generatedCode = productCodeGenerator.generate(setting);

      expect(generatedCode).toMatch(/^001--XYZ$/);
    });

    it('should generate a code with custom counter and padding', () => {
      const setting = new ProductSettingImpl({
        id: '1',
        userId: '1',
        key: ProductSettingKey.CODE_GENERATION,
        properties: new Map([
          [ProductSettingPropertyKey.CODE_GENERATION_COUNTER, 10],
          [ProductSettingPropertyKey.CODE_GENERATION_COUNTER_PADDING, 5],
        ]),
      });
      const generatedCode = productCodeGenerator.generate(setting);

      expect(generatedCode).toMatch(/^00011P$/);
    });
  });
});
