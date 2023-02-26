import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SettingRepository,
  SettingValidatorBuilder,
} from '../../domain/interfaces';
import { Setting } from '../../domain/models';
import { CreateSettingCommand } from '../commands';

@CommandHandler(CreateSettingCommand)
export class CreateSettingCommandHandler
  implements ICommandHandler<CreateSettingCommand>
{
  constructor(
    private readonly settingRepository: SettingRepository,
    private readonly settingValidatorBuilder: SettingValidatorBuilder,
  ) {}

  async execute(command: CreateSettingCommand) {
    this.validateSetting(command);

    const { userId, properties, key } = command;
    const condition = { key };

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
          key,
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
    const validation = this.settingValidatorBuilder
      .buildCreateSettingValidator(command)
      .validate();

    if (validation) {
      throw new BadRequestException(validation);
    }
  }
}
