import { Test, TestingModule } from '@nestjs/testing';
import {
  ProductRepository,
  ProductSettingRepository,
} from '~/features/product/domain/interfaces/repositories';
import { ProductFactory, ProductSettingFactory } from '../domain/factories';
import { ProductInfrastructureModule } from './product-infrastructure.module';

describe('ProductInfrastructureModule', () => {
  let module: TestingModule;
  let productFactory: ProductFactory;
  let productSettingFactory: ProductSettingFactory;
  let productRepository: ProductRepository;
  let productSettingRepository: ProductSettingRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ProductInfrastructureModule],
    }).compile();

    productFactory = module.get<ProductFactory>(ProductFactory);
    productSettingFactory = module.get<ProductSettingFactory>(
      ProductSettingFactory,
    );
    productRepository = module.get<ProductRepository>(ProductRepository);
    productSettingRepository = module.get<ProductSettingRepository>(
      ProductSettingRepository,
    );
  });

  afterAll(async () => {
    await module.close();
  });

  describe('ProductFactory', () => {
    it('should be defined', () => {
      expect(productFactory).toBeDefined();
    });
  });

  describe('ProductSettingFactory', () => {
    it('should be defined', () => {
      expect(productSettingFactory).toBeDefined();
    });
  });

  describe('ProductRepository', () => {
    it('should be defined', () => {
      expect(productRepository).toBeDefined();
    });
  });

  describe('ProductSettingRepository', () => {
    it('should be defined', () => {
      expect(productSettingRepository).toBeDefined();
    });
  });
});
