import { Setting } from '../models';

export interface SettingRepository {
  generateId(namespace?: string): string;
  create(setting: Setting): Promise<Setting>;
  update(setting: Setting): Promise<Setting>;
  delete(userId: string, id: string): Promise<boolean>;
  deleteMany(userId: string, ids: string[]): Promise<boolean>;
  find(userId: string, id: string): Promise<Setting>;
  findAll(userId: string, ids?: string[]): Promise<Setting[]>;
}
