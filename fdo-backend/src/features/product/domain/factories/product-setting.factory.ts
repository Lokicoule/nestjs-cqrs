import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ProductSetting } from '../interfaces/models';
import { ProductSettingFields, ProductSettingImpl } from '../models';

type CreateProductSettingFields = Pick<
  ProductSettingFields,
  'id' | 'key' | 'properties' | 'userId'
>;

@Injectable()
export class ProductSettingFactory {
  constructor(private readonly eventPublisher: EventPublisher) {}

  create(fields: CreateProductSettingFields): ProductSetting {
    return this.createInDomainContext(fields);
  }

  restore(product: ProductSettingFields): ProductSetting {
    return this.createInDomainContext(product);
  }

  private createInDomainContext(product: ProductSettingFields): ProductSetting {
    return this.eventPublisher.mergeObjectContext(
      new ProductSettingImpl(product),
    );
  }
}
