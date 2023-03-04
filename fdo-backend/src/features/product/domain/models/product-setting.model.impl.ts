import { AggregateRoot } from '@nestjs/cqrs';
import { ProductSettingKey, ProductSettingPropertyKey } from '../enums';
import { ProductSetting } from '../interfaces/models';

export type ProductSettingRequiredFields = Readonly<
  Required<{
    id: string;
    key: ProductSettingKey;
    properties: Map<ProductSettingPropertyKey, string | number>;
    userId: string;
  }>
>;

export type ProductSettingFields = ProductSettingRequiredFields;

export class ProductSettingImpl
  extends AggregateRoot
  implements ProductSetting
{
  public readonly id: string;
  public readonly key: ProductSettingKey;
  public readonly properties: Map<ProductSettingPropertyKey, string | number>;
  public readonly value: string | number;
  public readonly userId: string;

  constructor(properties: ProductSettingFields) {
    super();
    Object.assign(this, properties);
  }

  counterUpdated(counter: number): void {
    this.properties.set(
      ProductSettingPropertyKey.CODE_GENERATION_COUNTER,
      ((this.properties.get(
        ProductSettingPropertyKey.CODE_GENERATION_COUNTER,
      ) as number) ?? 0) + counter,
    );
  }
}
