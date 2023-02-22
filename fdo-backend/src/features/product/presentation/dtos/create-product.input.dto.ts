import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateProductInputDTO {
  @Field(/* { nullable: true } */)
  //@IsOptional()
  //code?: string;
  code: string;

  @Field()
  @IsNotEmpty()
  label: string;
}
