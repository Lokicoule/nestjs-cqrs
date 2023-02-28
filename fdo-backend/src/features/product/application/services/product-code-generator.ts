import { Injectable } from '@nestjs/common';
import { ProductRepository } from '~/features/product/domain/interfaces/repositories';
import { SettingRepository } from '~/features/setting/domain/interfaces/repositories';
import {
  PropertyKeyEnum,
  SettingKeyEnum,
} from '~/features/setting/domain/enums';
import { Setting } from '~/features/setting/domain/models';

@Injectable()
export class ProductCodeGenerator {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly settingRepository: SettingRepository,
  ) {}

  async generateCode(userId: string): Promise<string> {
    const setting = await this.settingRepository.findByKey(
      userId,
      SettingKeyEnum.PRODUCT_CODE_GENERATOR,
    );

    let nbAttempts = 0;
    for (nbAttempts; nbAttempts < 10; nbAttempts++) {
      const code = this.generateUniqueCode(setting);
      if (!(await this.productRepository.exists(userId, code))) {
        return code;
      }
    }
    throw new Error(
      'Unable to generate a unique product code after 10 attempts',
    );
  }

  private generateUniqueCode(setting: Setting): string {
    const prefix = setting.getProperty(PropertyKeyEnum.PREFIX);
    const suffix = setting.getProperty(PropertyKeyEnum.SUFFIX);
    const counter = setting.getProperty(PropertyKeyEnum.COUNTER);
    const code = `${prefix}${counter.toString().padStart(3, '0')}${suffix}`;
    setting.incrementCounter();
    return code;
  }
}
