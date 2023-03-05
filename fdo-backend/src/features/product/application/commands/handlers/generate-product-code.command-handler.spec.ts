import { BadRequestException, ConflictException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import {
  ProductSettingKey,
  ProductSettingPropertyKey,
} from '~/features/product/domain/enums';
import { ProductSettingFactory } from '~/features/product/domain/factories';
import {
  ProductRepository,
  ProductSettingRepository,
} from '~/features/product/domain/interfaces/repositories';
import { ProductSettingImpl } from '~/features/product/domain/models';
import { ProductCodeGenerator } from '~/features/product/domain/services/product-code-generator';
import { GenerateProductCodeCommand } from '../impl';
import { GenerateProductCodeCommandHandler } from './generate-product-code.command-handler';

const mockProductRepository = {
  exists: jest.fn(),
};

const mockProductSettingRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  generateId: jest.fn(),
  upsert: jest.fn(),
};

const mockProductCodeGenerator = {
  generate: jest.fn(),
};

const mockProductSettingFactory = {
  create: jest.fn(),
};

describe('GenerateProductCodeCommandHandler', () => {
  let commandHandler: GenerateProductCodeCommandHandler;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GenerateProductCodeCommandHandler,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
        {
          provide: ProductSettingRepository,
          useValue: mockProductSettingRepository,
        },
        {
          provide: ProductCodeGenerator,
          useValue: mockProductCodeGenerator,
        },
        {
          provide: ProductSettingFactory,
          useValue: mockProductSettingFactory,
        },
        CommandBus,
      ],
    }).compile();

    commandBus = moduleRef.get<CommandBus>(CommandBus);
    commandHandler = moduleRef.get<GenerateProductCodeCommandHandler>(
      GenerateProductCodeCommandHandler,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should throw a BadRequestException if validation fails', async () => {
      await expect(
        commandHandler.execute(new GenerateProductCodeCommand(null)),
      ).rejects.toThrow(BadRequestException);

      await expect(
        commandHandler.execute(new GenerateProductCodeCommand(null, 'code')),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return code if it was already provided in the command', async () => {
      const command: GenerateProductCodeCommand = { userId: '1', code: 'ABC' };

      const result = await commandHandler.execute(command);

      expect(result).toBe('ABC');
      expect(mockProductRepository.exists).not.toHaveBeenCalled();
      expect(mockProductSettingRepository.findOne).not.toHaveBeenCalled();
      expect(mockProductCodeGenerator.generate).not.toHaveBeenCalled();
      expect(mockProductSettingRepository.create).not.toHaveBeenCalled();
      expect(mockProductSettingRepository.update).not.toHaveBeenCalled();
      expect(mockProductSettingRepository.generateId).not.toHaveBeenCalled();
      expect(mockProductSettingFactory.create).not.toHaveBeenCalled();
    });

    it('should generate a new code if it was not provided in the command', async () => {
      const command: GenerateProductCodeCommand = { userId: '1' };
      const setting = {
        userId: '1',
        properties: new Map<ProductSettingPropertyKey, string | number>([
          [ProductSettingPropertyKey.CODE_GENERATION_COUNTER, 0],
          [ProductSettingPropertyKey.CODE_GENERATION_COUNTER_PADDING, 3],
          [ProductSettingPropertyKey.CODE_GENERATION_MAX_ATTEMPTS, 20],
          [ProductSettingPropertyKey.CODE_GENERATION_PREFIX, ''],
          [ProductSettingPropertyKey.CODE_GENERATION_SUFFIX, 'P'],
          [
            ProductSettingPropertyKey.CODE_GENERATION_PATTERN,
            '{prefix}{counter}{suffix}',
          ],
        ]),
        counterUpdated: jest.fn(),
      };
      const code = 'ABC';

      mockProductSettingRepository.upsert.mockResolvedValueOnce(setting);
      mockProductCodeGenerator.generate.mockReturnValueOnce(code);
      mockProductRepository.exists.mockResolvedValueOnce(false);

      const result = await commandHandler.execute(command);

      expect(result).toBe(code);
      expect(mockProductSettingRepository.upsert).toHaveBeenCalledTimes(1);
      expect(mockProductCodeGenerator.generate).toHaveBeenCalledWith(
        setting,
        1,
      );
      expect(mockProductRepository.exists).toHaveBeenCalledWith('1', code);
      expect(mockProductSettingRepository.update).toHaveBeenCalledWith(setting);
    });

    it('should create a new setting if it does not exist', async () => {
      const setting = new ProductSettingImpl({
        id: '1',
        userId: '1',
        key: ProductSettingKey.CODE_GENERATION,
        properties: new Map<ProductSettingPropertyKey, string | number>([
          [ProductSettingPropertyKey.CODE_GENERATION_COUNTER, 123],
          [ProductSettingPropertyKey.CODE_GENERATION_COUNTER_PADDING, 3],
          [ProductSettingPropertyKey.CODE_GENERATION_MAX_ATTEMPTS, 20],
          [ProductSettingPropertyKey.CODE_GENERATION_PREFIX, ''],
          [ProductSettingPropertyKey.CODE_GENERATION_SUFFIX, 'P'],
          [
            ProductSettingPropertyKey.CODE_GENERATION_PATTERN,
            '{prefix}{counter}{suffix}',
          ],
        ]),
      });
      const command = new GenerateProductCodeCommand('1');
      mockProductSettingRepository.generateId.mockReturnValueOnce('1');
      mockProductRepository.exists.mockResolvedValue(false);
      mockProductSettingRepository.upsert.mockReturnValueOnce(setting);
      mockProductCodeGenerator.generate.mockReturnValue('123P');
      mockProductSettingRepository.update.mockResolvedValueOnce(setting);

      await commandHandler.execute(command);

      expect(mockProductSettingRepository.upsert).toHaveBeenCalledTimes(1);
      expect(mockProductSettingRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should retry generating a new code up to the maximum number of attempts specified in the setting', async () => {
      const setting = new ProductSettingImpl({
        id: '1',
        userId: '1',
        key: ProductSettingKey.CODE_GENERATION,
        properties: new Map<ProductSettingPropertyKey, string | number>([
          [ProductSettingPropertyKey.CODE_GENERATION_COUNTER, 123],
          [ProductSettingPropertyKey.CODE_GENERATION_COUNTER_PADDING, 3],
          [ProductSettingPropertyKey.CODE_GENERATION_MAX_ATTEMPTS, 10],
          [ProductSettingPropertyKey.CODE_GENERATION_PREFIX, ''],
          [ProductSettingPropertyKey.CODE_GENERATION_SUFFIX, 'P'],
          [
            ProductSettingPropertyKey.CODE_GENERATION_PATTERN,
            '{prefix}{counter}{suffix}',
          ],
        ]),
      });
      const command = new GenerateProductCodeCommand('1');
      jest.spyOn(setting, 'counterUpdated').mockImplementation();
      mockProductSettingRepository.upsert.mockResolvedValueOnce(setting);
      mockProductRepository.exists.mockResolvedValue(true);
      mockProductCodeGenerator.generate.mockReturnValue('123P');
      mockProductSettingRepository.update.mockResolvedValueOnce(setting);

      try {
        await commandHandler.execute(command);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe(
          'Unable to generate a unique product code after 10 attempts',
        );
        expect(mockProductCodeGenerator.generate).toHaveBeenCalledTimes(10);
        expect(setting.counterUpdated).toHaveBeenCalledTimes(1);
        expect(mockProductSettingRepository.update).toHaveBeenCalledTimes(1);
      }
    });
  });
});
