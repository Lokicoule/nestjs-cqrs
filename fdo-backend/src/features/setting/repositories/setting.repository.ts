import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingKeyEnum } from '../enums/setting-key.enum';
import { Setting, SettingDocument } from '../models/setting.model';

@Injectable()
export class SettingRepository {
  constructor(
    @InjectModel('Setting')
    private readonly settingModel: Model<SettingDocument>,
  ) {}

  async create(setting: Setting): Promise<Setting> {
    const createdSetting = new this.settingModel(setting);
    return createdSetting.save();
  }

  async update(
    key: SettingKeyEnum,
    properties: Map<string, any>,
    userId: string,
  ): Promise<Setting> {
    const setting = await this.settingModel.findOneAndUpdate(
      { key, userId },
      { properties },
      { new: true },
    );
    return setting ? setting.toObject() : null;
  }

  async updateSettingProperty(
    userId: string,
    key: string,
    property: string,
    value: any,
  ): Promise<Setting> {
    const setting = await this.settingModel.findOneAndUpdate(
      { userId, key },
      { $set: { [`properties.${property}`]: value } },
      { new: true },
    );

    return setting ? setting.toObject() : null;
  }

  async delete(key: SettingKeyEnum, userId: string): Promise<boolean> {
    const result = await this.settingModel.deleteOne({ key, userId });
    return result.deletedCount > 0;
  }

  async findByKey(key: SettingKeyEnum, userId: string): Promise<Setting> {
    const setting = await this.settingModel.findOne({ key, userId }).exec();
    return setting ? setting.toObject() : null;
  }

  async findAll(userId: string): Promise<Setting[]> {
    const settings = await this.settingModel.find({ userId }).exec();
    return settings.map((setting) => setting.toObject());
  }
}
