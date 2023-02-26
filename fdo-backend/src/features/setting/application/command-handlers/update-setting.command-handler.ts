import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  SettingRepository,
  SettingValidatorBuilder,
} from '../../domain/interfaces';
import { Setting } from '../../domain/models';
import { UpdateSettingCommand } from '../commands';

@CommandHandler(UpdateSettingCommand)
export class UpdateSettingCommandHandler
  implements ICommandHandler<UpdateSettingCommand>
{
  constructor(
    private readonly settingRepository: SettingRepository,
    private readonly settingValidatorBuilder: SettingValidatorBuilder,
  ) {}

  async execute(command: UpdateSettingCommand) {
    this.validateSetting(command);

    const { userId, key, id } = command;
    const condition = { key, id };

    if (!(await this.settingRepository.exists(userId, condition))) {
      throw new BadRequestException(
        'Setting key does not exist in database for this user',
      );
    }

    try {
      return this.settingRepository.update(new Setting(command));
    } catch (error) {
      throw new BadRequestException(
        `Failed to update setting: ${error.message}`,
      );
    }
  }

  private validateSetting(command: UpdateSettingCommand) {
    const validation = this.settingValidatorBuilder
      .buildUpdateSettingValidator(command)
      .validate();

    if (validation) {
      throw new BadRequestException(validation);
    }
  }
}
