import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SettingRepository } from '../../domain/interfaces';
import { Setting } from '../../domain/models';
import { GetSettingByKeyQuery } from '../queries';

@QueryHandler(GetSettingByKeyQuery)
export class GetSettingByKeyQueryHandler
  implements IQueryHandler<GetSettingByKeyQuery>
{
  constructor(private readonly settingRepository: SettingRepository) {}

  async execute(query: GetSettingByKeyQuery): Promise<Setting> {
    const { settingKey, userId } = query;
    return this.settingRepository.findByKey(userId, settingKey);
  }
}
