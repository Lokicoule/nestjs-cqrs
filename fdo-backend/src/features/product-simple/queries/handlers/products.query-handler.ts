import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetProductsQuery } from '../impl';
import { Product } from '../../models';

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler
  implements IQueryHandler<GetProductsQuery>
{
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async execute(query: GetProductsQuery): Promise<Product[]> {
    const { userId, ids } = query;

    const queryObject = { userId };
    if (ids && ids.length) {
      queryObject['_id'] = { $in: ids };
    }

    const products = await this.productModel.find(queryObject).exec();
    return products;
  }
}
