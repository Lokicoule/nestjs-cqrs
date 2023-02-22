import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductDTO {
  @Field(() => ID)
  public readonly id: string;

  @Field()
  public readonly code: string;

  @Field()
  public readonly label: string;

  @Field()
  public readonly createdAt: Date;

  @Field()
  public readonly updatedAt: Date;
}
