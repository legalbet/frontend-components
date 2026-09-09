import type {
  NotPartnerPopupType,
  BonusCardPopupParams,
  LockedDayPopupParams,
  GameOverPopupParams,
  ActivityInfoPopupParams,
  OnboardingPopupParams,
  PauseGamePopupParams,
  PartnersActivityPopupParams,
  InvitePopupParams,
  DailyTaskAction,
  DailyTaskHistory,
} from '@/types/external-types';
import type { FilterProps } from '@/filter/types';
import type { ComputedRef, Ref } from 'vue';

export interface PopupStore {
  activePopup: {
    popupName: PopupName | null;
    params?: PopupParams[PopupName] | null;
  };
  popupQueue: { popupName: PopupName; params?: PopupParams[PopupName] }[];
}

export enum PopupName {
  AgeRestriction = 'ageRestrictionPopup',
  Auth = 'auth',
  SuccessRegistration = 'successRegistration',
  RecoverPassword = 'recoverPassword',
  RecoverSuccess = 'recoverSuccess',
  NotPartners = 'notPartners',
  SocialRegister = 'SocialMediaRegister',
  EnhancedExample = 'enhancedExample',
  CookiesPopupWithChoice = 'cookiesPopupWithChoice',
  BookNotSupportedByGeoPopup = 'BookNotSupportedByGeoPopup',
  BonusCardPopup = 'BonusCardPopup',
  ResettingPasswordPopup = 'ResettingPasswordPopup',
  FilterPopup = 'FilterPopup',
  LockedDayPopup = 'LockedDayPopup',
  ActivityInfoPopup = 'ActivityInfoPopup',
  OnboardingPopup = 'OnboardingPopup',
  GameOverPopup = 'GameOverPopup',
  SocialMediaSharePopup = 'SocialMediaSharePopup',
  BonusGamePopup = 'BonusGamePopup',
  InvitePopup = 'InvitePopup',
  CommentGallery = 'CommentGallery',
  SecretCollectablePopup = 'SecretCollectablePopup',
  PauseGamePopup = 'PauseGamePopup',
  PartnersActivityPopup = 'PartnersActivityPopup',
  BestBonusBtn = 'BestBonusBtn',
  LegalConsentPopup = 'LegalConsentPopup',
  CommentBanForm = 'CommentBanForm',
  CommentToComplaint = 'CommentToComplaint',
  CommentToFeedback = 'CommentToFeedback',
  AgeConfirmModal = 'AgeConfirmModal',
}

type FilterPopupParams = Omit<FilterProps, 'filterSections' | 'selected' | 'isAnyChecked'> & {
  filterSections: ComputedRef<FilterProps['filterSections']>;
  selected: Ref<FilterProps['selected']>;
  isAnyChecked: ComputedRef<FilterProps['isAnyChecked']>;
};

export type PopupParams = {
  [PopupName.AgeRestriction]: null;
  [PopupName.Auth]: {
    isLogin: boolean;
  } | null;
  [PopupName.SuccessRegistration]: {
    email: string;
  };
  [PopupName.RecoverPassword]: null;
  [PopupName.RecoverSuccess]: {
    email: string;
  };
  [PopupName.NotPartners]: {
    partnerType: NotPartnerPopupType;
    mobileType?: string; // data-mobile-type
  };
  [PopupName.SocialRegister]: {
    data: SocialRegisterParams;
  };
  [PopupName.EnhancedExample]: {
    title: string;
    message: string;
  };
  [PopupName.CookiesPopupWithChoice]: null;
  [PopupName.BookNotSupportedByGeoPopup]: null;
  [PopupName.ResettingPasswordPopup]: {
    token: string;
    csrf_token: string;
  };
  [PopupName.FilterPopup]: {
    filterParams: FilterPopupParams;
    totalCount: ComputedRef<number>;
    loading: Ref<boolean>;
  };
  [PopupName.BonusCardPopup]: BonusCardPopupParams;
  [PopupName.LockedDayPopup]: LockedDayPopupParams;
  [PopupName.ActivityInfoPopup]: ActivityInfoPopupParams;
  [PopupName.OnboardingPopup]: OnboardingPopupParams;
  [PopupName.GameOverPopup]: GameOverPopupParams;
  [PopupName.PauseGamePopup]: PauseGamePopupParams;
  [PopupName.InvitePopup]: InvitePopupParams;
  [PopupName.BonusGamePopup]: {
    nameBook: string;
    logo: string;
    affLink: string;
    title: string;
    ordToken?: string;
  };
  [PopupName.SocialMediaSharePopup]: {
    copyLink: string;
    socialMedia: string[];
    shareTitle?: string;
    shareDescription?: string;
    shareImage?: string;
  };
  [PopupName.CommentGallery]: {
    photos: [];
    initialIndex: number;
  };
  [PopupName.SecretCollectablePopup]: {
    collectableName: string;
    dailyTaskActions: DailyTaskAction[];
    dailyTaskHistory: DailyTaskHistory[];
  };
  [PopupName.PartnersActivityPopup]: PartnersActivityPopupParams;
  [PopupName.BestBonusBtn]: {
    bonus: object;
    viewLink: string;
    iconSvg: string | null;
    bookName: string | null;
    amountText: string;
    notPartnerPopupTrigger: string;
    reflinkUrl: string | null;
    cardType: string;
    objectSeoName: string | null;
    modalTitle: string | null;
  };
  [PopupName.LegalConsentPopup]: () => void;
  [PopupName.CommentBanForm]: {
    commentId: number;
    action?: string;
    objectType: string;
    objectId: number;
  };
  [PopupName.CommentToComplaint]: {
    commentId: number;
  };
  [PopupName.CommentToFeedback]: {
    commentId: number;
    bookId?: number;
    type?: string;
  };
  [PopupName.AgeConfirmModal]: null;
};

export interface SocialRegisterParams {
  email: string;
  username: string;
  hash: string;
  ageLimit: boolean;
  personalDataPolicy: boolean;
  uid: string;
  noticeBonus: boolean;
}
