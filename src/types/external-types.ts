// Заглушки типов для внешних feature-зависимостей
// При использовании в host-проекте эти типы должны быть совместимы

export type WebAnalyticsGoal = {
  goalName: string;
  debug?: boolean;
  identifies?: Array<string>;
  params?: Record<string, any>;
};

export enum NotPartnerPopupType {
  Bookmaker = 'book',
  Casino = 'casino',
  BookmakerIllegalRating = 'book-illegal-rating',
  Mobile = 'mobile',
  EmptyList = 'empty-list',
}

export type BonusCardPopupParams = {
  bonus: Record<string, any>;
  locale: string;
  showButtons: boolean;
  copyPromo: boolean;
  isEditorsChoice?: boolean;
  objectSeoName: string | null;
  label: string;
};

export type DailyTaskAction = {
  id: number;
  title: string;
  type: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  maxQuantity: number;
  maxDayQuantity: number;
  additionalData: Record<string, any> | null;
  [key: string]: any;
};

export type DailyTaskHistory = {
  id: number;
  [key: string]: any;
};

// challengeArena types
export type PointType = string;

// challengeArena popup params
export type LockedDayPopupParams = Record<string, any>;
export type GameOverPopupParams = Record<string, any>;
export type ActivityInfoPopupParams = Record<string, any>;
export type OnboardingPopupParams = Record<string, any>;
export type PauseGamePopupParams = Record<string, any>;
export type PartnersActivityPopupParams = Record<string, any>;
export type InvitePopupParams = Record<string, any>;

// advertising
export enum AdFoxBannerType {
  Desktop = 'desktop',
  Mobile = 'mobile',
}

export const AdfoxApp = {
  init: () => { },
  loadBanner: () => { },
};

// cookies
export const CookiesContainer = {
  get: (_key: string): string | null => null,
  set: (_key: string, _value: string, _days?: number): void => { },
  remove: (_key: string): void => { },
};

// mainMenu
export enum MenuMobileBottom {
  Main = 'main',
  Bonuses = 'bonuses',
  Books = 'books',
  Profile = 'profile',
}

export function useMenuStore() {
  return {
    state: { items: [] },
    init: () => { },
  };
}

// dynamicData
export enum DynamicDataType {
  Bonus = 'bonus',
  Bookmaker = 'bookmaker',
}

export enum StaticBlockNames {
  SeoText = 'seo-text',
  Promo = 'promo',
}

export function useDynamicData() {
  return {
    getDynamicData: async (_items: any[]) => ({ data: [] }),
  };
}

// froala
export const SeoText = {
  name: 'SeoText',
  template: '<div class="seo-text"><slot /></div>',
};
