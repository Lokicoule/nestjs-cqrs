import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '~/features/product/domain/interfaces/repositories';
import { Product } from '~/features/product/domain/interfaces/models';
import { GetProductsQuery } from '../impl';

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler
  implements IQueryHandler<GetProductsQuery>
{
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetProductsQuery): Promise<Product[]> {
    const { userId, ids } = query;

    return this.productRepository.findAll(userId, ids);
  }
}
