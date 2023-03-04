import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { Product } from '~/features/product/domain/interfaces/models';
import { ProductValidatorBuilder } from '~/features/product/domain/validators/product';
import { CreateProductWithCodeGenCommand } from '../impl';

@CommandHandler(CreateProductWithCodeGenCommand)
export class CreateProductWithCodeGenCommandHandler
  implements ICommandHandler<CreateProductWithCodeGenCommand>
{
  private readonly logger = new Logger(
    CreateProductWithCodeGenCommandHandler.name,
  );

  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: CreateProductWithCodeGenCommand): Promise<Product> {
    this.validateCommand(command);

    const code = await this.commandBus.execute(
      command.generateProductCodeCommand,
    );

    command.createProductCommand.code = code;
    return this.commandBus.execute(command.createProductCommand);
  }

  private validateCommand(command: CreateProductWithCodeGenCommand) {
    const validation = new ProductValidatorBuilder()
      .withLabel(command.label)
      .withUserId(command.userId)
      .build()
      .validate();

    if (validation) {
      this.logger.error(validation);
      throw new BadRequestException(validation);
    }
  }
}
