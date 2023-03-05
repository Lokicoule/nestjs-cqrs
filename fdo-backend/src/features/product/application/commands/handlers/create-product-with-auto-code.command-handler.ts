import { BadRequestException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { Product } from '~/features/product/domain/interfaces/models';
import { ProductValidatorBuilder } from '~/features/product/domain/validators/product';
import { CreateProductWithAutoCodeCommand } from '../impl';

@CommandHandler(CreateProductWithAutoCodeCommand)
export class CreateProductWithAutoCodeCommandHandler
  implements ICommandHandler<CreateProductWithAutoCodeCommand>
{
  private readonly logger = new Logger(
    CreateProductWithAutoCodeCommandHandler.name,
  );

  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: CreateProductWithAutoCodeCommand): Promise<Product> {
    try {
      this.validateCommand(command);

      const code = await this.commandBus.execute(
        command.createGenerateProductCodeCommand(),
      );

      return this.commandBus.execute(command.createCreateProductCommand(code));
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private validateCommand(command: CreateProductWithAutoCodeCommand) {
    const validation = new ProductValidatorBuilder()
      .withLabel(command.label)
      .withUserId(command.userId)
      .build()
      .validate();

    if (validation) {
      throw new BadRequestException(validation);
    }
  }
}
