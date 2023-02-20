import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Setting } from '../../models/setting.model';
import { SettingRepository } from '../../repositories';
import { GetSettingQuery } from '../impl';

@QueryHandler(GetSettingQuery)
export class GetSettingHandler implements IQueryHandler<GetSettingQuery> {
  constructor(private readonly repository: SettingRepository) {}

  async execute(query: GetSettingQuery): Promise<Setting> {
    const { key, userId } = query;
    return this.repository.findByKey(key, userId);
  }
}
