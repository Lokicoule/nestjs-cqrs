import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SettingRepository } from '~/features/setting/domain/interfaces/repositories';
import { SettingValidatorBuilder } from '~/features/setting/domain/interfaces/validators';
import { Setting } from '~/features/setting/domain/models';
import { UpdateSettingCommand } from '../impl';

@CommandHandler(UpdateSettingCommand)
export class UpdateSettingHandler
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
