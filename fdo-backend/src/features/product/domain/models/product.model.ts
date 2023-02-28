import { AggregateRoot } from '@nestjs/cqrs';
import { SettingCounterUpdatedEvent } from '~/features/setting/application/events/impl';
import { PropertyKeyEnum } from '~/features/setting/domain/enums';
import { Setting } from '~/features/setting/domain/models';

export type ProductRequiredFields = Readonly<
  Required<{
    label: string;
    userId: string;
  }>
>;

export type ProductOptionalFields = Readonly<
  Partial<{
    id: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type ProductFields = ProductRequiredFields & ProductOptionalFields;

export class Product extends AggregateRoot {
  public readonly id: string;
  public readonly userId: string;
  private code: string;
  private readonly label: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(fields: ProductFields) {
    super();
    Object.assign(this, fields);
  }

  updateSettingCounter(setting: Setting) {
    setting.incrementCounter();

    this.apply(new SettingCounterUpdatedEvent(setting));
  }

  generateCode(setting: Setting) {
    const prefix = setting.getProperty(PropertyKeyEnum.PREFIX);
    const suffix = setting.getProperty(PropertyKeyEnum.SUFFIX);
    const counter = setting.getProperty(PropertyKeyEnum.COUNTER);

    this.code = `${prefix}${counter.toString().padStart(3, '0')}${suffix}`;
  }

  getCode() {
    return this.code;
  }
}
