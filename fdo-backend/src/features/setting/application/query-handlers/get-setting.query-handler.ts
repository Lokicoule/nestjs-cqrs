/* import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SettingRepository } from '../../domain/interfaces';
import { Setting } from '../../domain/models';
import { GetSettingQuery } from '../queries';

@QueryHandler(GetSettingQuery)
export class GetSettingQueryHandler implements IQueryHandler<GetSettingQuery> {
  @Inject('SettingRepository')
  private readonly settingRepository: SettingRepository;

  async execute(query: GetSettingQuery): Promise<Product> {
    const { settingKey, userId } = query;
    return this.settingRepository.find(userId, productId);
  }
}
 */
