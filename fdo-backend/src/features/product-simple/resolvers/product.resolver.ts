import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductCommand } from '../commands';
import { GetProductQuery, GetProductsQuery } from '../queries';
import { CreateProductInput, ProductDTO } from '../dto';
import { Product } from '../models';
import { CognitoUser } from '@nestjs-cognito/auth';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation((returns) => ProductDTO)
  async createProduct(
    @CognitoUser('username') userId: string,
    @Args('input') input: CreateProductInput,
  ): Promise<ProductDTO> {
    const command = new CreateProductCommand(input.label, userId, input.code);
    const product = await this.commandBus.execute(command);
    return product;
  }

  @Query(() => ProductDTO)
  async getProduct(
    @CognitoUser('username') userId: string,
    @Args('id') id: string,
  ): Promise<ProductDTO> {
    const query = new GetProductQuery(id, userId);
    const product = await this.queryBus.execute(query);
    return product;
  }

  @Query(() => [ProductDTO])
  async getProducts(
    @CognitoUser('username') userId: string,
    @Args('ids', { type: () => [String], nullable: true }) ids?: string[],
  ): Promise<ProductDTO[]> {
    const query = new GetProductsQuery(userId, ids);
    const products = await this.queryBus.execute(query);
    return products;
  }
}
