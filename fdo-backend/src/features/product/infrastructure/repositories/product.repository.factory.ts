import { ProductRepositoryImpl } from './product.repository.impl';

export const productRepositoryFactory = {
  provide: 'ProductRepository',
  useClass: ProductRepositoryImpl,
};
