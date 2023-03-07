import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Notification {
  @Field()
  id: string;

  @Field()
  domain: string;

  @Field()
  topic: string;

  @Field()
  message: string;
}
