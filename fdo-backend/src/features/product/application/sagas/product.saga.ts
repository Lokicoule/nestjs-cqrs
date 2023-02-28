/* import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetSettingByKeyQuery } from '~/features/setting/application/queries';
import { SettingKeyEnum } from '~/features/setting/domain/enums';
import { CreateProductCommand } from '../commands/create-product.command';
import { CreateSettingCommand } from '../commands/create-setting.command';
import { UpdateSettingCommand } from '../commands/update-setting.command';
import { ProductCodeRequestedEvent } from '../events/product-code-requested.event';
import { ProductCreatedEvent } from '../events/product-created.event';

@Injectable()
export class ProductSaga {
  @Saga()
  productCodeRequested = (
    events$: Observable<IEvent>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductCodeRequestedEvent),
      map((event) => {
        const { userId } = event;
        const command = new GetSettingByKeyQuery(
          SettingKeyEnum.PRODUCT_CODE_GENERATOR,
          userId,
        );
        return command;
      }),
    );
  };

  @Saga()
  generateProductCode = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(GetSettingByKeyQuery),
      map((query) => {
        const { result: setting } = query;
        const { userId } = setting;
        const productCodeSettingValue = setting.properties.get('value');

        // If the setting doesn't exist, create it with default values
        if (!productCodeSettingValue) {
          const createSettingCommand = new CreateSettingCommand(
            userId,
            'productCode',
            {
              counter: 1,
              prefix: 'P',
              suffix: '',
            },
          );
          return createSettingCommand;
        }

        // If the setting exists, update it and generate the new product code
        const [counter, prefix, suffix] = productCodeSettingValue.split('|');
        const newCounter = parseInt(counter) + 1;
        const newProductCode = `${prefix}${newCounter}${suffix}`;
        const updateSettingCommand = new UpdateSettingCommand(
          userId,
          setting.id,
          'productCode',
          {
            counter: newCounter,
            prefix: prefix,
            suffix: suffix,
          },
        );
        const createProductCommand = new CreateProductCommand(
          userId,
          newProductCode,
          '',
        );
        return [updateSettingCommand, createProductCommand];
      }),
    );
  };

  // This is an example of how to handle the events that result from the commands
  handleProductCreatedEvent(event: ProductCreatedEvent): void {
    const { product } = event;
    // Do something with the created product
  }

  handleProductCodeRequestedEvent(event: ProductCodeRequestedEvent): void {
    const { userId } = event;
    // Do something with the product code requested event
  }
}
 */
