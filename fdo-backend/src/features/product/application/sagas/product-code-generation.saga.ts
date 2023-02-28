import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CacheService } from '~/common/cache';
import {
  PropertyKeyEnum,
  SettingKeyEnum,
} from '~/features/setting/domain/enums';
import { Setting } from '~/features/setting/domain/models';
import { SettingRepository } from '~/features/setting/domain/interfaces/validators';
import { GenerateProductCodeCommand } from '../commands';

@Injectable()
export class ProductCodeGenerationSaga {
  constructor(
    private readonly settingRepository: SettingRepository,
    private readonly cacheService: CacheService,
  ) {}

  @Saga()
  generateProductCode = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(GenerateProductCodeCommand),
      switchMap(({ userId }) => {
        return from(
          this.cacheService.get(`product-code-setting:${userId}`),
        ).pipe(
          switchMap((setting: Setting) => {
            if (setting) {
              return from([setting]);
            } else {
              return from(
                this.settingRepository.findByKey(
                  userId,
                  SettingKeyEnum.PRODUCT_CODE_GENERATOR,
                ),
              ).pipe(
                switchMap((setting) => {
                  if (setting) {
                    return from([setting]);
                  } else {
                    const newSetting = new Setting({
                      id: this.settingRepository.generateId(),
                      userId,
                      key: SettingKeyEnum.PRODUCT_CODE_GENERATOR,
                      properties: new Map<PropertyKeyEnum, any>([
                        [PropertyKeyEnum.PREFIX, ''],
                        [PropertyKeyEnum.SUFFIX, 'P'],
                        [PropertyKeyEnum.COUNTER, 1],
                      ]),
                    });

                    return from(this.settingRepository.create(newSetting)).pipe(
                      map((setting) => {
                        this.cacheService.set(
                          `product-code-setting:${userId}`,
                          setting,
                        );
                        return setting;
                      }),
                    );
                  }
                }),
              );
            }
          }),
          switchMap((setting: Setting) => {
            const prefix = setting.properties[PropertyKeyEnum.PREFIX];
            const suffix = setting.properties[PropertyKeyEnum.SUFFIX];
            const counter = setting.properties[PropertyKeyEnum.COUNTER];

            const productCode = `${prefix}${counter}${suffix}`;

            setting.properties[PropertyKeyEnum.COUNTER] = counter + 1;

            return from(this.settingRepository.update(setting)).pipe(
              map(() => {
                this.cacheService.set(
                  `product-code-setting:${userId}`,
                  setting,
                );
                return new GenerateProductCodeCompletedEvent(productCode);
              }),
            );
          }),
        );
      }),
    );
  };
}
