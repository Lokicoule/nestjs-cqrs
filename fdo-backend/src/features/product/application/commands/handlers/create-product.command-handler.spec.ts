import { BadRequestException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { ProductFactory } from '~/features/product/domain/factories';
import { Product } from '~/features/product/domain/interfaces/models';
import { ProductRepository } from '~/features/product/domain/interfaces/repositories';
import { ProductImpl } from '~/features/product/domain/models';
import { CreateProductCommand } from '../impl/create-product.command';
import { CreateProductCommandHandler } from './create-product.command-handler';

describe('CreateProductCommandHandler', () => {
  let handler: CreateProductCommandHandler;
  let repository: ProductRepository;
  let factory: ProductFactory;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateProductCommandHandler,
        {
          provide: ProductRepository,
          useValue: {
            exists: jest.fn(),
            generateId: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: ProductFactory,
          useValue: {
            create: jest.fn(),
          },
        },
        CommandBus,
      ],
    }).compile();

    handler = moduleRef.get(CreateProductCommandHandler);
    repository = moduleRef.get(ProductRepository);
    factory = moduleRef.get(ProductFactory);
    commandBus = moduleRef.get(CommandBus);
  });

  describe('execute', () => {
    it('should throw an error if the product code already exists', async () => {
      const command = new CreateProductCommand('userId', 'label', 'code');
      jest.spyOn(repository, 'exists').mockResolvedValue(true);

      await expect(handler.execute(command)).rejects.toThrowError(
        BadRequestException,
      );
      expect(repository.exists).toHaveBeenCalledWith('userId', 'code');
    });

    it('should create a new product and return it', async () => {
      const command = new CreateProductCommand('userId', 'label', 'code');
      const id = 'generatedId';
      const product: Partial<Product> = {
        id,
        label: 'label',
        code: 'code',
        userId: 'userId',
      };

      const productImpl = new ProductImpl(product as Product);
      jest.spyOn(repository, 'exists').mockResolvedValue(false);
      jest.spyOn(repository, 'generateId').mockReturnValue(id);
      jest.spyOn(factory, 'create').mockReturnValue(productImpl);
      jest.spyOn(repository, 'create').mockResolvedValue(productImpl);

      const result = await handler.execute(command);

      expect(result).toEqual(productImpl);
      expect(repository.exists).toHaveBeenCalledWith('userId', 'code');
      expect(repository.generateId).toHaveBeenCalledWith('userId');
      expect(factory.create).toHaveBeenCalledWith(product);
      expect(repository.create).toHaveBeenCalledWith(productImpl);
    });
  });

  describe('validateCommand', () => {
    it('should throw an error if the command is invalid', async () => {
      const command = new CreateProductCommand('userId', '', 'code');

      expect(() => handler['validateCommand'](command)).toThrowError(
        BadRequestException,
      );
    });

    it('should not throw an error if the command is valid', async () => {
      const command = new CreateProductCommand('userId', 'label', 'code');

      expect(() => handler['validateCommand'](command)).not.toThrow();
    });
  });
});
