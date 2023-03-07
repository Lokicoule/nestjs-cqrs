import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule, NotificationModule],
})
export class FeaturesModule {}
