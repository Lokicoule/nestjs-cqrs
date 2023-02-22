import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductCommand, GenerateProductCodeCommand } from '../impl';
import { ProductCreatedEvent } from '../../events/impl/product-created.event';
import { Product } from '../../models/product.model';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateProductCommand) {
    const { label, userId, code } = command;

    const product = new this.productModel({
      label,
      userId,
      code,
    });

    // Validate the product
    this.validateProduct(product);

    // If no product code was provided, generate one using a saga
    if (!code) {
      const generatedCode = await this.generateProductCode(userId);
      product.code = generatedCode;
    }

    // Create the product in the database
    const createdProduct = await product.save();

    // Dispatch a ProductCreatedEvent with the new product
    this.eventBus.publish(new ProductCreatedEvent(createdProduct));

    return createdProduct;
  }

  private async generateProductCode(userId: string): Promise<string> {
    const generateProductCodeCommand = new GenerateProductCodeCommand(userId);
    const generatedCode = await this.commandBus.execute(
      generateProductCodeCommand,
    );
    return generatedCode;
  }

  private validateProduct(product: Product) {
    // TODO: Add validation logic here
  }
}
