export type SortValue = string;

export type SortOption<TSort extends SortValue = SortValue> = {
  id: TSort | '';
  text: string;
};
