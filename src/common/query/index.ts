type TBaseQuery<T> = Partial<BaseListQuery<T>>;

interface IPagination {
  limit: number;
  offset: number;
}

class Pagination {
  readonly limit = 10;
  readonly offset = 0;
}

export abstract class BaseListQuery<T> {
  pagination: IPagination;
  filters?: T;

  protected constructor(init: TBaseQuery<T>) {
    this.pagination = init.pagination ?? new Pagination();
    this.filters = init.filters;
  }
}
