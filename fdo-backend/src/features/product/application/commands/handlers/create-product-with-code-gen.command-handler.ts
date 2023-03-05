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

  private validateCommand(command: CreateProductWithCodeGenCommand) {
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
