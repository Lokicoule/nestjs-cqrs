import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../domain/interfaces';
import { Product } from '../../domain/models';
import { GetProductsQuery } from '../queries';

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
