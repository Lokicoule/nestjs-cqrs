import { Test, TestingModule } from '@nestjs/testing';
import { SettingRepository } from '~/features/setting/domain/interfaces/repositories';
import { SettingValidatorBuilder } from '~/features/setting/domain/interfaces/validators';
import { SettingFactory } from '~/features/setting/domain/interfaces/factories';
import { SettingInfrastructureModule } from './setting-infrastructure.module';

describe('SettingInfrastructureModule', () => {
  let module: TestingModule;
  let settingRepository: SettingRepository;
  let settingValidatorBuilder: SettingValidatorBuilder;
  let settingFactory: SettingFactory;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SettingInfrastructureModule],
    }).compile();

    settingRepository = module.get<SettingRepository>(SettingRepository);
    settingValidatorBuilder = module.get<SettingValidatorBuilder>(
      SettingValidatorBuilder,
    );
    settingFactory = module.get<SettingFactory>(SettingFactory);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('SettingRepository', () => {
    it('should be defined', () => {
      expect(settingRepository).toBeDefined();
    });
  });

  describe('SettingValidatorBuilder', () => {
    it('should be defined', () => {
      expect(settingValidatorBuilder).toBeDefined();
    });
  });

  describe('SettingFactory', () => {
    it('should be defined', () => {
      expect(settingFactory).toBeDefined();
    });
  });
});
