import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityIdGenerator } from '~/common';
import { ProductRepository } from '../../domain/interfaces';
import { Product } from '../../domain/models';
import { ProductDocument } from '../entities';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  generateId(): string {
    return EntityIdGenerator.generate().id;
  }

  async create(productData: Product): Promise<Product> {
    const productEntity = new this.productModel(productData);
    const createdProductEntity = await productEntity.save();
    return createdProductEntity ? createdProductEntity.toObject() : null;
  }

  async update(product: Product): Promise<Product> {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      { id: product.id, userId: product.userId },
      product,
      { new: true },
    );
    return updatedProduct ? updatedProduct.toObject() : null;
  }

  async delete(userId: string, id: string): Promise<boolean> {
    const result = await this.productModel.deleteOne({ _id: id, userId });
    return result.deletedCount > 0;
  }

  async deleteMany(userId: string, ids: string[]): Promise<boolean> {
    const result = await this.productModel.deleteMany({
      _id: { $in: ids },
      userId,
    });
    return result.deletedCount > 0;
  }

  async find(userId: string, id: string): Promise<Product> {
    const product = await this.productModel.findOne({ id, userId }).exec();
    return product ? product.toObject() : null;
  }

  async findAll(userId: string, ids?: string[]): Promise<Product[]> {
    const queryObject = { userId };

    if (ids && ids.length) {
      queryObject['_id'] = { $in: ids };
    }

    const products = await this.productModel.find(queryObject).exec();
    return products ? products.map((p) => p.toObject()) : [];
  }
}
