import { ValidationPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SettingRepository } from '../../domain/interfaces/setting.repository';
import { Setting } from '../../domain/models';
import { CreateSettingCommand } from '../commands';

@CommandHandler(CreateSettingCommand)
export class CreateSettingCommandHandler
  implements ICommandHandler<CreateSettingCommand>
{
  constructor(private readonly settingRepository: SettingRepository) {}

  async execute(command: CreateSettingCommand) {
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
}
