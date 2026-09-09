export type FilterGroups = Record<FilterGroupName, FilterGroup>;
export type SelectedFilters = Record<string, number[]>;
//Группы вильтров - сайдбар (main), табы и тд
export enum FilterGroupName {
  Main = 'main',
  Tabs = 'tabs',
  FiltersBlock = 'filters_block',
}

export type FilterGroup = {
  id: number;
  name: string;
  sections: Record<string, FilterSectionType>;
  count: number;
  hidden: boolean;
  systemName: FilterGroupName;
};

export type FilterParams = Record<string, number[]>;

export type FilterSectionType = {
  systemName: string; // query key base: "type", "condition", ...
  name: string;
  nameShort: string;
  nameHidden: boolean;
  tooltipText: string;
  tooltipHidden: boolean;
  filters: Record<string, Filter>;
  count: number;
  hidden: boolean;
};

export type Filter = {
  id: number; // query value, e.g. type[]=461
  systemName: string;
  name: string;
  inputType: string;
  icon: string;
  checked: boolean;
  count: number;
  dataIds: number[];
  hidden: boolean;
  filterSetUrl: string | null;
};

export type NewFilter = {
  canonicalName: string;
  iconSvg: string;
  id: number;
  locale: number;
  name: string;
  published: true;
  systemName: string;
  entityCount: number;
  type: 'filter';
};

export type FilterSet = {
  id: number;
  seoName: string;
  url: string;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoHeader: string;
  seoText: string;
  titleH1: string;
  filterParams: FilterParams;
  hidden: boolean;
  adminUrl: string | null;
};

export type NewFilterSectionType = {
  canonicalName: string;
  inputType: 'radio' | 'checkbox';
  systemName: string; // query key base: "type", "condition", ...
  locale: number;
  name: string;
  nameHidden: boolean;
  published: boolean;
  showSettings: boolean;
  tooltipText: string;
  tooltipHidden: boolean;
  filters: {
    forbiddenCountries: [];
    id: number;
    isHidden: boolean;
    order: number;
    published: boolean;
    type: 'filterSectionLink';
    value: null;
    filter: NewFilter;
  }[];
};

export type FilterGroupResponse = [
  {
    entityType: string;
    id: number;
    locale: number;
    name: string;
    published: true;
    sections: {
      id: number;
      order: number;
      type: 'filterGroupSectionLink';
      filterSection: NewFilterSectionType;
    }[];
    systemName: string;
    type: string;
  },
];

export type FilterDataResponse = {
  // Примененные фильтры (в приоритете смотрим на URL и парсим его, если там нет - то смотрим filterParams)
  filterParams: FilterParams;
  //Все группы фильтров
  filterGroups: FilterGroups;
  // if present -> should replace browser URL with filterSet.url
  filterSet: FilterSet | null;
  resultData: unknown;
  adBlock: unknown;
  totalCount: number;
  pagination: { mainUrl: string } | null;
  orderByParams: Record<string, unknown>;
  displayedSets: unknown[];
  textBlocks: {
    description: string;
    lastUpdated: string;
    lastUpdateHumanized: string;
    metaDescription: string;
    metaKeywords: string;
    seoText: string;
    seoTextHeading: string;
    title: string;
    titleH1: string;
    titleH2: string;
  };
  routeInfo: unknown;
  filterSetTabs: unknown[];
  upperTabs: unknown[];
  widgets: unknown;
  locale: string | null;
  noindex: boolean;
};

export type UiFilterItem = {
  id: number;
  name: string;
  checked: boolean;
  disabled?: boolean;
  count?: number;
  img?: string;
  systemName: string;
};

// export type FilterProps = {
//   hasHeader?: boolean;
//   hasFooter?: boolean;
//   filterSections: FilterSectionType[];
//   selected: SelectedFilters;
//   isAnyChecked: boolean;
//   onSetFilter: (sectionSystemName: string, filterId: number, checked: boolean) => void;
//   onResetAll: () => void;
// };

export type FilterProps = {
  hasHeader?: boolean;
  hasFooter?: boolean;
  filterSections: NewFilterSectionType[];
  selected: SelectedFilters;
  isAnyChecked: boolean;
  onSetFilter: (sectionSystemName: string, filterId: number, checked: boolean) => void;
  onResetAll: () => void;
};
