import { Product } from '../models/product.model';

export abstract class ProductRepository {
  abstract generateId(namespace?: string): string;
  abstract create(product: Product): Promise<Product>;
  abstract update(product: Product): Promise<Product>;
  abstract delete(userId: string, id: string): Promise<void>;
  abstract deleteMany(userId: string, ids: string[]): Promise<void>;
  abstract find(userId: string, id: string): Promise<Product>;
  abstract findAll(userId: string, ids?: string[]): Promise<Product[]>;
  abstract exists(userId: string, code: string): Promise<boolean>;
}
