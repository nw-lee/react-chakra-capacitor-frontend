export interface IHeaderMain {
  back: boolean;
}

export interface ISearchInput {
  search: boolean;
  path: boolean;
  setSearch: (key: boolean) => void;
  setPath?: (key: boolean) => void;
}
