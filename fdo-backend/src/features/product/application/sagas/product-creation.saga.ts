import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CreateProductCommand } from './commands/create-product.command';
import { CreateSettingCommand } from './commands/create-setting.command';
import { GetSettingByKeyQuery } from './queries/get-setting-by-key.query';
import { ProductCodeExistsQuery } from './queries/product-code-exists.query';

@Injectable()
export class ProductCreationSagaWithCodeGeneration {
  @Saga()
  productCreation = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductCreationSagaWithCodeGeneration),
      map((event) => event.payload),
      mergeMap((payload) =>
        this.productCodeExists(payload.code).pipe(
          mergeMap((codeExists) => {
            if (codeExists) {
              return this.retryProductCreation(payload);
            } else {
              return this.createOrUpdateSetting(payload).pipe(
                mergeMap(() =>
                  this.createProduct(
                    payload.userId,
                    payload.code,
                    payload.label,
                  ),
                ),
              );
            }
          }),
        ),
      ),
    );
  };

  private productCodeExists(code: string): Observable<boolean> {
    // Use a query to check if the code exists in the database
    const query = new ProductCodeExistsQuery(code);
    return this.queryBus.execute(query);
  }

  private createOrUpdateSetting(payload: any): Observable<any> {
    // Use a query to get the setting or default values if not found
    const query = new GetSettingByKeyQuery(payload.userId, 'product_code');
    return this.queryBus.execute(query).pipe(
      mergeMap((setting: any) => {
        // Generate the code using the setting values
        const {
          prefix = '',
          suffix = '',
          counter = 0,
        } = setting?.properties || {};
        const generatedCode = prefix + (counter + 1) + suffix;

        // Create or update the setting with the new counter value
        const command = setting
          ? new UpdateSettingCommand(
              payload.userId,
              setting.id,
              'product_code',
              {
                key: 'product_code',
                value: { ...setting.properties, counter: counter + 1 },
              },
            )
          : new CreateSettingCommand(payload.userId, 'product_code', {
              key: 'product_code',
              value: { prefix, suffix, counter: 1 },
            });

        return this.commandBus.execute(command);
      }),
    );
  }

  private createProduct(
    userId: string,
    code: string,
    label: string,
  ): Observable<any> {
    // Create the product with the generated code
    const command = new CreateProductCommand(userId, code, label);
    return this.commandBus.execute(command);
  }

  private retryProductCreation(payload: any): Observable<ICommand> {
    // Retry the saga by emitting the event again with the same payload
    return of(new ProductCreationSagaWithCodeGeneration(payload));
  }
}
