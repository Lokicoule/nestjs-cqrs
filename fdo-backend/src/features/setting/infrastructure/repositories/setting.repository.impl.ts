import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { EntityIdGenerator } from '~/common/database';
import { SettingKeyEnum } from '../../domain/enums';
import { SettingRepository } from '../../domain/interfaces';
import { Setting } from '../../domain/models';
import { SettingDocument, SettingEntity } from '../entities';

@Injectable()
export class SettingRepositoryImpl implements SettingRepository {
  constructor(
    @InjectModel(SettingEntity.name)
    private readonly settingModel: Model<SettingDocument>,
  ) {}

  generateId(namespace?: string): string {
    return EntityIdGenerator.generate(namespace).id;
  }

  async create(settingData: Setting): Promise<Setting> {
    const settingDoc = new this.settingModel(settingData);
    await settingDoc.save();
    return this.toSetting(settingDoc);
  }

  async update(setting: Setting): Promise<Setting> {
    const updatedSettingDoc = await this.settingModel.findOneAndUpdate(
      { id: setting.id, userId: setting.userId },
      setting,
      { new: true, lean: true },
    );
    return updatedSettingDoc ? this.toSetting(updatedSettingDoc) : null;
  }

  async delete(userId: string, id: string): Promise<void> {
    await this.settingModel.deleteOne({ id, userId });
  }

  async deleteMany(userId: string, ids: string[]): Promise<void> {
    await this.settingModel.deleteMany({
      id: { $in: ids },
      userId,
    });
  }

  async find(userId: string, id: string): Promise<Setting> {
    const settingDoc = await this.settingModel
      .findOne({ id, userId })
      .lean()
      .exec();
    return this.toSetting(settingDoc);
  }

  async findAll(userId: string, ids?: string[]): Promise<Setting[]> {
    const queryObject = { userId };

    if (ids && ids.length) {
      queryObject['id'] = { $in: ids };
    }

    const settingsDoc = await this.settingModel.find(queryObject).lean().exec();
    return settingsDoc ? settingsDoc.map((doc) => this.toSetting(doc)) : [];
  }

  async findByKey(userId: string, key: SettingKeyEnum): Promise<Setting> {
    const setting = await this.settingModel
      .findOne({ key, userId })
      .lean()
      .exec();
    return setting ? this.toSetting(setting) : null;
  }

  async exists(userId: string, condition: Partial<Setting>): Promise<boolean> {
    const settingDoc = await this.settingModel
      .exists({ ...condition, userId })
      .lean()
      .exec();
    return Boolean(settingDoc);
  }

  private toSetting(
    doc: LeanDocument<SettingDocument> | SettingDocument,
  ): Setting {
    const { id, key, properties, userId, createdAt, updatedAt } = doc;
    return new Setting({
      id,
      key,
      properties,
      userId,
      createdAt,
      updatedAt,
    });
  }
}
