import { GetProductQueryHandler } from './get-product.query-handler';
import { GetProductsQueryHandler } from './get-products.query-handler';

export * from './get-product.query-handler';
export * from './get-products.query-handler';

export const QueryHandlers = [GetProductQueryHandler, GetProductsQueryHandler];
