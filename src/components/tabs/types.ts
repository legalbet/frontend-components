import type { WebAnalyticsGoal } from '@/types/external-types';
import type { IconNames } from '@/components/baseIcon/iconNames';

export type TabItem = {
  id?: string | number;
  text?: string;
  disabled?: boolean;
  goal?: WebAnalyticsGoal;
  counter?: string;
  startIconName?: IconNames;
  href?: string;
};

export type TabButtonItem = TabItem & {
  endIconName?: IconNames;
  startImgParams?: {
    src: string;
    alt: string;
  };
  endImgParams?: {
    src: string;
    alt: string;
  };
};

export enum TabsVariant {
  Tab = 'tab',
  Segmented = 'segmented',
  Line = 'line',
}

export enum TabsTheme {
  Default = 'default',
  White = 'white',
  Dark = 'dark',
}
