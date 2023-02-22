import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CacheService } from '~/common';
import { PropertyKeyEnum, SettingKeyEnum } from '~/features/setting/enums';
import { Setting } from '~/features/setting/models/setting.model';
import { SettingRepository } from '~/features/setting/repositories/setting.repository';
import { GenerateProductCodeCommand } from '../commands/impl/generate-product-code.command';
import { GenerateProductCodeCompletedEvent } from '../events/impl';

@Injectable()
export class GenerateProductCodeSaga {
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
                  SettingKeyEnum.PRODUCT_CODE_GENERATOR,
                  userId,
                ),
              ).pipe(
                switchMap((setting) => {
                  if (setting) {
                    return from([setting]);
                  } else {
                    const newSetting = new Setting();
                    newSetting.userId = userId;
                    newSetting.key = SettingKeyEnum.PRODUCT_CODE_GENERATOR;
                    newSetting.properties = new Map<PropertyKeyEnum, any>();

                    newSetting.properties[PropertyKeyEnum.PREFIX] = '';
                    newSetting.properties[PropertyKeyEnum.SUFFIX] = 'P';
                    newSetting.properties[PropertyKeyEnum.COUNTER] = 1;

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
          map((setting) => {
            const prefix = setting.properties[PropertyKeyEnum.PREFIX] || '';
            const suffix = setting.properties[PropertyKeyEnum.SUFFIX] || 'P';
            let counter = setting.properties[PropertyKeyEnum.COUNTER] || 1;

            const code = prefix + counter.toString().padStart(4, '0') + suffix;

            counter++;
            this.cacheService.set(`product-code-setting:${userId}`, {
              ...setting,
              properties: {
                ...setting.properties,
                [PropertyKeyEnum.COUNTER]: counter,
              },
            });
            this.settingRepository.updateSettingProperty(
              userId,
              SettingKeyEnum.PRODUCT_CODE_GENERATOR,
              PropertyKeyEnum.COUNTER,
              counter,
            );

            return new GenerateProductCodeCompletedEvent(userId, code);
          }),
        );
      }),
    );
  };
}
