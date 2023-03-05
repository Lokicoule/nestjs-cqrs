import { BadRequestException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductWithCodeGenCommand } from '../impl/create-product-with-code-gen.command';
import { CreateProductCommand } from '../impl/create-product.command';
import { CreateProductWithCodeGenCommandHandler } from './create-product-with-code-gen.command-handler';

import { ICommandHandler } from '@nestjs/cqrs';
import { GenerateProductCodeCommand } from '../impl';
import { ProductValidatorBuilder } from '~/features/product/domain/validators/product';

describe('CreateProductWithCodeGenCommandHandler', () => {
  let handler: ICommandHandler<CreateProductWithCodeGenCommand>;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductWithCodeGenCommandHandler,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreateProductWithCodeGenCommandHandler>(
      CreateProductWithCodeGenCommandHandler,
    );
    commandBus = module.get<CommandBus>(CommandBus);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a product with code', async () => {
    const command = new CreateProductWithCodeGenCommand('user-id', 'label');

    const generateCodeCommand = new GenerateProductCodeCommand(
      'user-id',
      undefined,
    );
    const createProductCommand = new CreateProductCommand(
      'user-id',
      'label',
      'product-code',
    );

    jest
      .spyOn(command, 'createGenerateProductCodeCommand')
      .mockReturnValue(generateCodeCommand);
    jest
      .spyOn(command, 'createCreateProductCommand')
      .mockReturnValue(createProductCommand);
    jest.spyOn(commandBus, 'execute').mockResolvedValueOnce('product-code');
    jest.spyOn(commandBus, 'execute').mockResolvedValueOnce({
      id: 'product-id',
      label: 'label',
      code: 'product-code',
      userId: 'user-id',
    });

    const result = await handler.execute(command);

    expect(result).toEqual({
      id: 'product-id',
      label: 'label',
      code: 'product-code',
      userId: 'user-id',
    });
    expect(commandBus.execute).toHaveBeenCalledWith(generateCodeCommand);
    expect(commandBus.execute).toHaveBeenCalledWith(createProductCommand);
  });

  it('should throw BadRequestException if command validation fails', async () => {
    const command = new CreateProductWithCodeGenCommand('user-id', '');

    await expect(handler.execute(command)).rejects.toThrow(BadRequestException);

    expect(commandBus.execute).not.toHaveBeenCalled();
  });

  it('should log and rethrow errors thrown during execution', async () => {
    const command = new CreateProductWithCodeGenCommand('user-id', 'label');

    const error = new Error('Something went wrong');
    jest.spyOn(commandBus, 'execute').mockRejectedValue(error);
    const loggerErrorSpy = jest
      .spyOn(handler['logger'], 'error')
      .mockImplementation();

    await expect(handler.execute(command)).rejects.toThrow(error);

    expect(loggerErrorSpy).toHaveBeenCalledWith(error);
  });
});
