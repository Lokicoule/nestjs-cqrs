import { ProductSettingKey } from '../../enums';
import { ProductSetting } from '../models';

export abstract class ProductSettingRepository {
  abstract generateId(namespace?: string): string;
  abstract create(setting: ProductSetting): Promise<ProductSetting>;
  abstract update(setting: ProductSetting): Promise<ProductSetting>;
  abstract upsert(
    filter: Record<string, unknown>,
    setting: ProductSetting,
  ): Promise<ProductSetting>;
  abstract delete(userId: string, id: string): Promise<void>;
  abstract deleteMany(userId: string, ids: string[]): Promise<void>;
  abstract findOne(filter: Record<string, any>): Promise<ProductSetting>;
  abstract find(userId: string, id: string): Promise<ProductSetting>;
  abstract findAll(userId: string, ids?: string[]): Promise<ProductSetting[]>;
  abstract exists(userId: string, key: ProductSettingKey): Promise<boolean>;
}
