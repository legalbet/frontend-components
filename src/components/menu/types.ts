import { RouteName } from '../../types/RouteName';
import { Lang } from '../../types/Lang';

export interface MenuItemType {
  id: string;
  title: string;
  url: string;
  icon: string;
  iconPool: string;
  isHidden: boolean;
  isHiddenDesktop: boolean;
  geoAllowedLocales: Array<string>;
  type?: 'menu' | 'section';
  menuType: MenuType;
  isDefaultShow: boolean;
  status?: string;
  level: number;
  children: MenuItemType[];
  slimColumn: boolean;
}
export interface IconListType {
  data: {
    iconfont: string[];
    book_icons: { name: string; url: string }[];
    tournament_icons: {
      static: string[];
      tournaments: {
        name: string;
        url: string;
      }[];
    };
    casino_icons: { name: string; url: string }[];
  };
}

export interface GeoAllowedLocalesType {
  data: Record<string, string>;
}

export enum MenuIconPool {
  bkIconPool = 'bkIconPool',
  casinoIconPool = 'casinoIconPool',
  generalIconPool = 'generalIconPool',
  tournamentsIconPool = 'tournamentsIconPool',
}

export enum MenuType {
  default = 'default',
  bettingCenter = 'betting-center',
}

export interface User {
  id: number;
  username: string;
  bookPickerShow: boolean;
  avatar: string;
  isAdmin?: boolean | undefined;
  isPasswordRequired?: boolean | undefined;
  verifyUrl?: string | undefined;
}

export interface MenuItemProfile {
  icon: string;
  route: RouteName;
  label: Lang;
  params?: { [key: string]: string | number };
}
