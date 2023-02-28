import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SettingRepository } from '~/features/setting/domain/interfaces/repositories';
import { SettingValidatorBuilder } from '~/features/setting/domain/interfaces/validators';
import { Setting } from '~/features/setting/domain/models';
import { CreateSettingCommand } from '../impl';

@CommandHandler(CreateSettingCommand)
export class CreateSettingHandler
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
