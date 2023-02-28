import { SettingKeyEnum } from '../../enums';
import { Setting } from '../../models';

export abstract class SettingRepository {
  abstract generateId(namespace?: string): string;
  abstract create(setting: Setting): Promise<Setting>;
  abstract update(setting: Setting): Promise<Setting>;
  abstract delete(userId: string, id: string): Promise<void>;
  abstract deleteMany(userId: string, ids: string[]): Promise<void>;
  abstract find(userId: string, id: string): Promise<Setting>;
  abstract findAll(userId: string, ids?: string[]): Promise<Setting[]>;
  abstract findByKey(userId: string, key: SettingKeyEnum): Promise<Setting>;
  abstract exists(
    userId: string,
    condition: Partial<Setting>,
  ): Promise<boolean>;
}
