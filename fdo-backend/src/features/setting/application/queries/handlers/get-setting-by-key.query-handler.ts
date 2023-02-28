import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SettingRepository } from '~/features/setting/domain/interfaces/repositories';
import { Setting } from '~/features/setting/domain/models';
import { GetSettingByKeyQuery } from '../impl';

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
