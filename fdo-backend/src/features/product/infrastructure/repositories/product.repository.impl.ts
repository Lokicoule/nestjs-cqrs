import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { EntityIdGenerator } from '~/common';
import { ProductRepository } from '../../domain/interfaces';
import { Product } from '../../domain/models';
import { ProductDocument, ProductEntity } from '../entities';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectModel(ProductEntity.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  generateId(namespace?: string): string {
    return EntityIdGenerator.generate(namespace).id;
  }

  async create(productData: Product): Promise<Product> {
    const productDoc = new this.productModel(productData);
    await productDoc.save();
    return this.toProduct(productDoc);
  }

  async update(product: Product): Promise<Product> {
    const updatedProductDoc = await this.productModel.findOneAndUpdate(
      { id: product.id, userId: product.userId },
      product,
      { new: true, lean: true },
    );
    return updatedProductDoc ? this.toProduct(updatedProductDoc) : null;
  }

  async delete(userId: string, id: string): Promise<void> {
    await this.productModel.deleteOne({ id, userId });
  }

  async deleteMany(userId: string, ids: string[]): Promise<void> {
    await this.productModel.deleteMany({
      id: { $in: ids },
      userId,
    });
  }

  async find(userId: string, id: string): Promise<Product> {
    const productDoc = await this.productModel
      .findOne({ id, userId })
      .lean()
      .exec();
    return this.toProduct(productDoc);
  }

  async findAll(userId: string, ids?: string[]): Promise<Product[]> {
    const queryObject = { userId };

    if (ids && ids.length) {
      queryObject['id'] = { $in: ids };
    }

    const productsDoc = await this.productModel.find(queryObject).lean().exec();
    return productsDoc ? productsDoc.map((doc) => this.toProduct(doc)) : [];
  }

  private toProduct(
    doc: LeanDocument<ProductDocument> | ProductDocument,
  ): Product {
    const { id, code, label, userId, createdAt, updatedAt } = doc;
    return new Product({ id, code, label, userId, createdAt, updatedAt });
  }
}
