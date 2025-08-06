export interface SpinState {
  /**
   * Timestamp (ms) of the last moment when spins were reset.
   * Used together with configured reset interval to decide when to reset again.
   */
  lastReset: number;
  used: number;
  closed: boolean;
}

export interface Prize {
  title: string;
  link: string;
  condition: string;
}

export type RouletteState = 'start' | 'twist' | 'result';

export interface RouletteProps {
  /** Maximum number of spins. Default: 2. */
  maxSpins?: number;
  /** Reset interval in hours. Default: 24. */
  resetHours?: number;
  /** Key for the storage. Default: 'store'. */
  storeKey?: string;
  /** Texts for the roulette. Default: DEFAULT_TEXTS. */
  texts?: Texts;
  /** List of prize items displayed on the wheel. Default: data.ts export. */
  bonuses?: Prize[];
}

export interface Texts {
  // Start screen
  titleStart: string;
  subtitleStart: string;
  availableSpinsPrefix: string;
  noSpins: string;
  confirmAgeLabel: string;
  spinButton: string;

  // Twist screen
  twistTitle: string;

  // Result screen
  resultTitle: string;
  spinAgainButton: string;
  getBonusButton: string;

  // Terms component
  showTerms: string;
  hideTerms: string;

  // Other
  termMark: string;
  termsContent?: string;
}
