import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetProductQuery } from '../impl';
import { Product } from '../../models';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async execute(query: GetProductQuery): Promise<Product> {
    const { productId, userId } = query;
    const product = await this.productModel
      .findOne({ _id: productId, userId })
      .exec();
    return product;
  }
}
