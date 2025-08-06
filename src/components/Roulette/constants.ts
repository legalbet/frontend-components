export const STORE_NAME = 'roulette_spins';
export const MAX_SPINS = 2;
export const DEFAULT_RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24h
export const DEFAULT_STORE_KEY = 'store';

export const WHEEL_PARAMS = {
  initialOffset: -20,
  itemMargin: 8,
  minRounds: 6,
  mediumRounds: 10,
  maxRounds: 15,
  itemsForMaxRounds: 6,
  itemsForMediumRounds: 12,
  minRoundsOffset: 4,
  maxMobileWidth: 767,
} as const;

export const DEFAULT_TEXTS = {
  resultTitle: "Congratulations! It's your lucky day",
  spinAgainLabel: 'Spin again',
  getBonusLabel: 'Get bonus',
  termsContent:
    'Register, verify your account, and make a first deposit of ₦1000 or more to receive a 300% boost up to ₦180 000. ' +
    'Meet the 10x wagering requirement by placing multi bets with 3 or more selections, each with odds at least 1.50. ' +
    'The reward is valid for 7 days.',
  showTermsLabel: 'Show T&C',
  hideTermsLabel: 'Hide T&C',
  responsibleText: '18+ | Responsible gambling',
};
