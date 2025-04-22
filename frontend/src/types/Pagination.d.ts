interface DataWrapper<T> {
  data: T;
}

interface PagableMetaData {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface PagableWrapper<T> extends DataWrapper<T>, PagableMetaData {}

interface PagableResourceWrapper<T> extends DataWrapper<T> {
  meta: PagableMetaData;
}
