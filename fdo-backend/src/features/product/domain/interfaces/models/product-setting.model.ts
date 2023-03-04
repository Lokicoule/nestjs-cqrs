import { AggregateRoot } from '@nestjs/cqrs';
import { ProductSettingKey, ProductSettingPropertyKey } from '../../enums';

export interface ProductSetting extends AggregateRoot {
  readonly id: string;
  readonly key: ProductSettingKey;
  readonly properties: Map<ProductSettingPropertyKey, string | number>;
  readonly userId: string;

  counterUpdated(counter: number): void;
}
