import { IconNames } from '@/components/baseIcon/iconNames';

export enum NoteStyle {
  Positive = 'positive',
  Negative = 'negative',
  Neutral = 'neutral',
  System = 'system',
}

export enum NoteType {
  Outline = 'outline',
  Fill = 'fill',
}

export enum NoteSize {
  Large = 'large',
  Small = 'small',
}

// Маппинг иконок для каждого типа уведомления
export const NOTE_ICONS: Record<NoteStyle, IconNames> = {
  [NoteStyle.Positive]: IconNames.CircleCheck,
  [NoteStyle.Negative]: IconNames.CircleE,
  [NoteStyle.Neutral]: IconNames.CircleI,
  [NoteStyle.System]: IconNames.CircleI,
};
