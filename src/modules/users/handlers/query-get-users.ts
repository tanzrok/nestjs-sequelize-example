import { BaseListQuery } from '../../../common/query';
import { filterGetUsersDto, QueryGetUsersDto } from '../dto/query-get-users.dto';

export class QueryGetUsersHandlers
  extends BaseListQuery<filterGetUsersDto>
  implements QueryGetUsersDto
{
  constructor(init: QueryGetUsersDto) {
    super(init);
  }
}
