import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateSettingCommand } from '../impl/create-setting.command';
import { SettingRepository } from '../../repositories/setting.repository';
import { Setting } from '../../models/setting.model';
import { SettingCreatedEvent } from '../../events/impl/setting-created.event';

@CommandHandler(CreateSettingCommand)
export class CreateSettingHandler
  implements ICommandHandler<CreateSettingCommand>
{
  constructor(
    private readonly repository: SettingRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateSettingCommand): Promise<Setting> {
    const setting = this.publisher.mergeObjectContext(
      await this.repository.create(
        command.key,
        command.properties,
        command.userId,
      ),
    );

    setting.commit();
    const settingCreatedEvent = new SettingCreatedEvent(setting);
    setting.publish(settingCreatedEvent);

    return setting;
  }
}
