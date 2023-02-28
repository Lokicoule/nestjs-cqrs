import { Test, TestingModule } from '@nestjs/testing';
import { SettingRepository } from '~/features/setting/domain/interfaces/repositories';
import { SettingFactory, SettingValidatorFactory } from '../domain/factories';
import { SettingInfrastructureModule } from './setting-infrastructure.module';

describe('SettingInfrastructureModule', () => {
  let module: TestingModule;
  let settingFactory: SettingFactory;
  let settingRepository: SettingRepository;
  let settingValidatorFactory: SettingValidatorFactory;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SettingInfrastructureModule],
    }).compile();

    settingFactory = module.get<SettingFactory>(SettingFactory);
    settingRepository = module.get<SettingRepository>(SettingRepository);
    settingValidatorFactory = module.get<SettingValidatorFactory>(
      SettingValidatorFactory,
    );
  });

  afterAll(async () => {
    await module.close();
  });

  describe('SettingFactory', () => {
    it('should be defined', () => {
      expect(settingFactory).toBeDefined();
    });
  });

  describe('SettingRepository', () => {
    it('should be defined', () => {
      expect(settingRepository).toBeDefined();
    });
  });

  describe('SettingValidatorFactory', () => {
    it('should be defined', () => {
      expect(settingValidatorFactory).toBeDefined();
    });
  });
});
