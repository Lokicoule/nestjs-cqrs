import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SettingRepository } from '../../domain/interfaces/setting.repository';
import { Setting } from '../../domain/models';
import { SettingValidatorBuilder } from '../../domain/validators';
import { UpdateSettingCommand } from '../commands';

@CommandHandler(UpdateSettingCommand)
export class UpdateSettingCommandHandler
  implements ICommandHandler<UpdateSettingCommand>
{
  constructor(private readonly settingRepository: SettingRepository) {}

  async execute(command: UpdateSettingCommand) {
    this.validateSetting(command);

    const { userId, properties, settingKey, settingId } = command;
    const condition = { key: settingKey, id: settingId };

    if (!(await this.settingRepository.exists(userId, condition))) {
      throw new BadRequestException(
        'Setting key does not exist in database for this user',
      );
    }

    try {
      return this.settingRepository.update(
        new Setting({
          id: settingId,
          key: settingKey,
          properties,
          userId,
        }),
      );
    } catch (error) {
      throw new BadRequestException(
        `Failed to update setting: ${error.message}`,
      );
    }
  }

  private validateSetting(command: UpdateSettingCommand) {
    const { userId, properties, settingKey, settingId } = command;
    const validation = new SettingValidatorBuilder()
      .withId(settingId)
      .withUserId(userId)
      .withProperties(properties)
      .withSettingKey(settingKey)
      .buildWithId()
      .validate();

    if (validation) {
      throw new BadRequestException(validation);
    }
  }
}
