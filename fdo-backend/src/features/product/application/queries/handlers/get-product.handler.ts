import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '~/features/product/domain/interfaces/repositories';
import { Product } from '~/features/product/domain/interfaces/models';
import { GetProductQuery } from '../impl';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(query: GetProductQuery): Promise<Product> {
    const { productId, userId } = query;
    return this.productRepository.find(userId, productId);
  }
}
