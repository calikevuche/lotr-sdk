export interface Response<T> {
  docs: T[];
  limit: number;
  offset: number;
  page: number;
  total: number;
}
