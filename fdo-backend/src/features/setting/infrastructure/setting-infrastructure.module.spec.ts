import { Test, TestingModule } from '@nestjs/testing';
import {
  SettingRepository,
  SettingValidatorBuilder,
} from '../domain/interfaces';
import { SettingInfrastructureModule } from './setting-infrastructure.module';

describe('SettingInfrastructureModule', () => {
  let module: TestingModule;
  let settingRepository: SettingRepository;
  let settingValidatorBuilder: SettingValidatorBuilder;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [SettingInfrastructureModule],
    }).compile();

    settingRepository = module.get<SettingRepository>(SettingRepository);
    settingValidatorBuilder = module.get<SettingValidatorBuilder>(
      SettingValidatorBuilder,
    );
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
});
