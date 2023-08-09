import { BaseListQuery } from '../../../common/query';
import { FilterGetUsersDto, QueryGetUsersDto } from '../dto/query-get-users.dto';

export class QueryGetUsersHandlers
  extends BaseListQuery<FilterGetUsersDto>
  implements QueryGetUsersDto
{
  constructor(init: QueryGetUsersDto) {
    super(init);
  }
}
