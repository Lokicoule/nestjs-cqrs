import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSettingCommand } from '../impl/update-setting.command';
import { Setting } from '../../models/setting.model';
import { SettingRepository } from '../../repositories/setting.repository';
import { SettingUpdatedEvent } from '../../events/impl/setting-updated.event';

@CommandHandler(UpdateSettingCommand)
export class UpdateSettingHandler
  implements ICommandHandler<UpdateSettingCommand>
{
  constructor(
    private readonly repository: SettingRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: UpdateSettingCommand): Promise<Setting> {
    const setting = await this.repository.update(
      command.key,
      command.properties,
      command.userId,
    );
    if (!setting) {
      return null;
    }

    const settingModel = this.publisher.mergeObjectContext(setting);
    settingModel.commit();
    const settingUpdatedEvent = new SettingUpdatedEvent(setting);
    setting.publish(settingUpdatedEvent);

    return setting;
  }
}
