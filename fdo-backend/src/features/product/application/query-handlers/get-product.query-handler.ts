import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../domain/interfaces';
import { Product } from '../../domain/models';
import { GetProductQuery } from '../queries';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetProductQuery): Promise<Product> {
    const { productId, userId } = query;
    return this.productRepository.find(userId, productId);
  }
}
