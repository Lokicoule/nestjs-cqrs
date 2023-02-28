import { CognitoUser } from '@nestjs-cognito/auth';
import { Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductCommand } from '../../application/commands';
import {
  GetProductQuery,
  GetProductsQuery,
} from '../../application/queries/impl';
import { CreateProductInputDTO, ProductDTO } from '../dtos';

@Resolver(() => ProductDTO)
export class ProductResolver {
  private readonly logger = new Logger(ProductResolver.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => ProductDTO, { name: 'product' })
  async getProduct(
    /*  @CognitoUser('username') userId: string, */
    @Args('id') id: string,
  ): Promise<ProductDTO> {
    const product = await this.queryBus.execute(
      new GetProductQuery(id, 'userId'),
    );
    return new ProductDTO(product);
  }

  @Query(() => [ProductDTO], { name: 'products' })
  async getProducts(
    /*  @CognitoUser('username') userId: string, */
    @Args('ids', { type: () => [String] }) ids: string[],
  ): Promise<ProductDTO[]> {
    const products = await this.queryBus.execute(
      new GetProductsQuery('userId', ids),
    );
    return products.map((product) => new ProductDTO(product));
  }

  @Mutation(() => ProductDTO)
  async createProduct(
    /*     @CognitoUser('username') userId: string,
     */ @Args('input') input: CreateProductInputDTO,
  ): Promise<ProductDTO> {
    const product = await this.commandBus.execute(
      new CreateProductCommand('userId', input.label, input.code),
    );
    this.logger.debug(`Product created with ID ${product.id}`);
    return new ProductDTO(product);
  }
}
