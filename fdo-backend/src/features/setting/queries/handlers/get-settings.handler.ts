import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSettingsQuery } from '../impl';
import { Setting } from '../../models/setting.model';
import { SettingRepository } from '../../repositories/setting.repository';

@QueryHandler(GetSettingsQuery)
export class GetSettingsHandler implements IQueryHandler<GetSettingsQuery> {
  constructor(private readonly repository: SettingRepository) {}

  async execute(query: GetSettingsQuery): Promise<Setting[]> {
    return this.repository.findAll(query.userId);
  }
}
