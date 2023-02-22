import { Product } from '../models/product';

export interface ProductRepository {
  generateId(): string;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  delete(userId: string, id: string): Promise<boolean>;
  deleteMany(userId: string, ids: string[]): Promise<boolean>;
  find(userId: string, id: string): Promise<Product>;
  findAll(userId: string, ids?: string[]): Promise<Product[]>;
}
