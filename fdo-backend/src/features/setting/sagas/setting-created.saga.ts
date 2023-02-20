import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeleteSettingCommand } from '../commands/impl/delete-setting.command';
import { SettingCreatedEvent } from '../events/impl/setting-created.event';

@Injectable()
export class SettingCreatedSaga {
  @Saga()
  settingCreated = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SettingCreatedEvent),
      map(
        (event) =>
          new DeleteSettingCommand(event.setting.key, event.setting.userId),
      ),
    );
  };
}
