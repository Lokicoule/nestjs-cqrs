import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeleteSettingCommand } from '../commands/impl/delete-setting.command';
import { SettingUpdatedEvent } from '../events/impl/setting-updated.event';

@Injectable()
export class SettingUpdatedSaga {
  @Saga()
  settingUpdated = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SettingUpdatedEvent),
      map(
        (event) =>
          new DeleteSettingCommand(event.setting.key, event.setting.userId),
      ),
    );
  };
}
