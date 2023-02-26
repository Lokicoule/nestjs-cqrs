import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SettingRepository } from '../../domain/interfaces';
import { Setting } from '../../domain/models';
import { SettingValidatorBuilder } from '../../domain/validators';
import { CreateSettingCommand } from '../commands';

@CommandHandler(CreateSettingCommand)
export class CreateSettingCommandHandler
  implements ICommandHandler<CreateSettingCommand>
{
  constructor(private readonly settingRepository: SettingRepository) {}

  async execute(command: CreateSettingCommand) {
    this.validateSetting(command);

    const { userId, properties, settingKey } = command;
    const condition = { key: settingKey };

    if (await this.settingRepository.exists(userId, condition)) {
      throw new BadRequestException(
        'Setting key already exists in database for this user',
      );
    }

    const id = this.settingRepository.generateId(userId);

    try {
      return this.settingRepository.create(
        new Setting({
          id,
          key: settingKey,
          properties,
          userId,
        }),
      );
    } catch (error) {
      throw new BadRequestException(
        `Failed to create setting: ${error.message}`,
      );
    }
  }

  private validateSetting(command: CreateSettingCommand) {
    const { userId, properties, settingKey } = command;
    const validation = new SettingValidatorBuilder()
      .withUserId(userId)
      .withProperties(properties)
      .withSettingKey(settingKey)
      .build()
      .validate();

    if (validation) {
      throw new BadRequestException(validation);
    }
  }
}
