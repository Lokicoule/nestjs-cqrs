import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field({ nullable: true })
  @IsOptional()
  code?: string;

  @Field()
  @IsNotEmpty()
  label: string;

  @Field()
  @IsNotEmpty()
  userId: string;
}
