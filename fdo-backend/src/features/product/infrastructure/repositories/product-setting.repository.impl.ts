import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { EntityIdGenerator } from '~/common/database';
import { ProductSettingKey } from '../../domain/enums';
import { ProductSettingFactory } from '../../domain/factories';
import { ProductSetting } from '../../domain/interfaces/models';
import { ProductSettingRepository } from '../../domain/interfaces/repositories';
import { ProductSettingDocument, ProductSettingEntity } from '../entities';

@Injectable()
export class ProductSettingRepositoryImpl implements ProductSettingRepository {
  constructor(
    @InjectModel(ProductSettingEntity.name)
    private readonly productSettingModel: Model<ProductSettingDocument>,
    private readonly settingSettingFactory: ProductSettingFactory,
  ) {}

  generateId(namespace?: string): string {
    return EntityIdGenerator.generate(namespace).id;
  }

  async create(settingData: ProductSetting): Promise<ProductSetting> {
    const settingDoc = new this.productSettingModel(settingData);
    await settingDoc.save();
    return this.toProductSetting(settingDoc);
  }

  async update(setting: ProductSetting): Promise<ProductSetting> {
    const updatedProductSettingDoc =
      await this.productSettingModel.findOneAndUpdate(
        { id: setting.id, userId: setting.userId },
        setting,
        { new: true },
      );
    return updatedProductSettingDoc
      ? this.toProductSetting(updatedProductSettingDoc)
      : null;
  }

  async createOrUpdate(setting: ProductSetting): Promise<ProductSetting> {
    const settingSettingDoc = await this.productSettingModel.findOneAndUpdate(
      { id: setting.id, userId: setting.userId },
      setting,
      { new: true, lean: true, upsert: true },
    );
    return settingSettingDoc ? this.toProductSetting(settingSettingDoc) : null;
  }

  async delete(userId: string, id: string): Promise<void> {
    await this.productSettingModel.deleteOne({ id, userId });
  }

  async deleteMany(userId: string, ids: string[]): Promise<void> {
    await this.productSettingModel.deleteMany({
      id: { $in: ids },
      userId,
    });
  }

  async find(userId: string, id: string): Promise<ProductSetting> {
    const settingDoc = await this.productSettingModel
      .findOne({ id, userId })
      .exec();
    return settingDoc ? this.toProductSetting(settingDoc) : null;
  }

  async findAll(userId: string, ids?: string[]): Promise<ProductSetting[]> {
    const queryObject = { userId };

    if (ids && ids.length) {
      queryObject['id'] = { $in: ids };
    }

    const settingsDoc = await this.productSettingModel.find(queryObject).exec();
    return settingsDoc
      ? settingsDoc.map((doc) => this.toProductSetting(doc))
      : [];
  }

  async findOne(filter: Record<string, any>): Promise<ProductSetting> {
    const settingDoc = await this.productSettingModel.findOne(filter);
    return settingDoc ? this.toProductSetting(settingDoc) : null;
  }

  async exists(userId: string, code: string): Promise<boolean> {
    const settingDoc = await this.productSettingModel
      .exists({ userId, code })
      .lean();
    return Boolean(settingDoc);
  }

  private toProductSetting(
    doc: LeanDocument<ProductSettingDocument> | ProductSettingDocument,
  ): ProductSetting {
    const { id, key, properties, userId } = doc;
    return this.settingSettingFactory.create({
      id,
      key,
      properties,
      userId,
    });
  }
}
