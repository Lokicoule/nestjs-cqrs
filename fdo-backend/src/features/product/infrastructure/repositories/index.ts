import { Provider } from '@nestjs/common';
import {
  ProductRepository,
  ProductSettingRepository,
} from '~/features/product/domain/interfaces/repositories';
import { ProductSettingRepositoryImpl } from './product-setting.repository.impl';
import { ProductRepositoryImpl } from './product.repository.impl';

export const RepositoriesProviders: Provider[] = [
  {
    provide: ProductRepository,
    useClass: ProductRepositoryImpl,
  },
  {
    provide: ProductSettingRepository,
    useClass: ProductSettingRepositoryImpl,
  },
];
